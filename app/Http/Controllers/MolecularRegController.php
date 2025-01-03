<?php

namespace App\Http\Controllers;

use App\Models\MolecularReg;
use App\Models\MolecularTest;
use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularRegRequest;
use App\Http\Requests\UpdateMolecularRegRequest;
use App\Models\Reference;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MolecularRegController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:molecular-list|molecular-create|molecular-edit|molecular-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:molecular-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:molecular-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:molecular-delete', ['only' => ['destroy']]);
        $this->middleware('permission:molecular-summary-report', ['only' => ['summaryReport']]);
        $this->middleware('permission:molecular-summary-details', ['only' => ['summaryDetails']]);
        $this->middleware('permission:molecular-due-check', ['only' => ['duesCheck']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $moleculars = MolecularReg::orderBy('patient_id', 'desc')->get();
        return Inertia::render('Molecular/ViewMolecular', ['moleculars' => $moleculars]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $references = Reference::all();
        $tests = MolecularTest::select('id', 'test_name', 'test_fee')->get();
        return Inertia::render('Molecular/CreateMolecular', ['tests' => $tests, 'references' => $references]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMolecularRegRequest $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'bill_no' => 'required|string|max:255|unique:molecular_regs,bill_no',
                'name' => 'required|string|max:255',
                'contact_no' => 'required|string|max:15',
                'age' => 'required|integer|min:0',
                'gender' => 'required|in:Male,Female,Other',
                'discount' => 'required|numeric|min:0',
                'paid' => 'required|numeric|min:0',
                'reference_name' => 'nullable|string|max:255',
                'payment_type' => 'required|string|in:Cash,Cheque,Card,Bkash,Rocket,Nagod,Internet Banking,Mobile Banking,Others',
                'account_head' => 'required|string|max:255',
                'tests' => 'required|array|min:1',
                'tests.*.test_id' => 'required|exists:molecular_tests,id',
            ]);

            if ($validator->fails()) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }

            $data = $request->all();
            $data['patient_id'] = $this->generateMolecularRegId();

            if ($user = Auth::user()) {
                $data['user_name'] = $user->name;
            } else {
                return redirect()->back()->with('error', 'User not authenticated');
            }

            $data['reg_date'] = $data['reg_date'] ?? now()->toDateString();
            $data['total'] = (float) ($data['total'] ?? collect($data['tests'])->sum(function ($test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }
                return (float)$test['total'];
            }));
            $data['paid'] = (float) $data['paid'];
            $data['discount'] = (float) $data['discount'];
            $data['due'] = max($data['total'] - $data['paid'] - $data['discount'], 0);
            $data['net_payable'] = $data['total'] - $data['discount'];

            $molReg = MolecularReg::create($data);

            foreach ($data['tests'] as $test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }

                MolecularRegTest::create([
                    'patient_id' => $molReg->patient_id,
                    'test_id'    => $test['test_id'],
                    'test_name'  => $molecularTest->test_name,
                    'test_fee'   => $molecularTest->test_fee,
                    'test_date'  => now()->toDateString(),
                ]);
            }

            return redirect()->route('molecular-inv', ['patient_id' => $molReg->patient_id])
                ->with('success', 'Molecular Registration completed successfully!');
        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', 'Molecular Registration failed!: ' . $e->getMessage());
        }
    }

    /**
     * Generate a unique Molecular Registration ID.
     */
    private function generateMolecularRegId()
    {
        $prefix = 'MCHM';
        $currentDate = now()->format('ymd');
        $serialNumber = 0;

        do {
            DB::beginTransaction();

            try {
                $latestRegId = DB::table('molecular_regs')
                    ->where('patient_id', 'like', "$prefix-$currentDate-%")
                    ->lockForUpdate() // Lock the rows to prevent race conditions
                    ->max('patient_id');

                $serialNumber = $latestRegId ? intval(substr($latestRegId, -3)) + 1 : 1;

                $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);
                $newRegId = "$prefix-$currentDate-$serialNumberFormatted";

                if (!MolecularReg::where('patient_id', $newRegId)->exists()) {
                    DB::commit();
                    return $newRegId;
                }

                DB::rollBack();
            } catch (Exception $e) {
                DB::rollBack();
                throw new Exception('Error generating registration ID: ' . $e->getMessage());
            }
        } while (true);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $molecularReg = MolecularReg::with('molecularTests')->get();
        $molecularReg = MolecularReg::with('molecularTests')->findOrFail($id);
        // dd($molecularReg);
        return Inertia::render('Molecular/ShowMolecular', ['molecularReg' => $molecularReg]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($patient_id)
    {
        $molecularReg = MolecularReg::with('molecularTests')->findOrFail($patient_id);
        $references = Reference::all();
        $tests = MolecularTest::select('id', 'test_name', 'test_fee')->get();
        // dd($molecularReg);
        return Inertia::render('Molecular/EditMolecular', ['molecularReg' => $molecularReg, 'references' => $references, 'tests' => $tests]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularRegRequest $request, $id)
    {
        // Start a transaction for atomic operations
        DB::beginTransaction();

        try {
            // Validate the request data
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'contact_no' => 'required|string|max:15',
                'age' => 'required|integer|min:1|max:120',
                'gender' => 'required|in:Male,Female,Other',
                'tests' => 'required|array',
                'tests.*.test_id' => 'required|exists:molecular_tests,id',
                'discount' => 'required|numeric|min:0',
                'paid' => 'required|numeric|min:0',
                'account_head' => 'nullable|string|max:255',
                'payment_type' => 'nullable|string|max:255',
                'reference_name' => 'nullable|string|max:255',
            ]);

            // Find the existing MolecularReg record
            $molecularReg = MolecularReg::findOrFail($id);

            // Calculate the updated total and due amounts
            $totalAmount = collect($validatedData['tests'])->sum(function ($test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }
                return $molecularTest->test_fee;
            });

            $netPayable = $totalAmount - $validatedData['discount'];
            $dueAmount = max($netPayable - $validatedData['paid'], 0);

            // Update MolecularReg details
            $molecularReg->update([
                'name' => $validatedData['name'],
                'contact_no' => $validatedData['contact_no'],
                'age' => $validatedData['age'],
                'gender' => $validatedData['gender'],
                'discount' => $validatedData['discount'],
                'paid' => $validatedData['paid'],
                'total' => $totalAmount,
                'net_payable' => $netPayable,
                'due' => $dueAmount,
                'account_head' => $validatedData['account_head'] ?? 'Cash in hand',
                'payment_type' => $validatedData['payment_type'],
                'reference_name' => $validatedData['reference_name'],
            ]);

            // Clear existing tests and re-insert updated test data
            $molecularReg->molecularTests()->delete(); // Assuming the relationship is named molecularTests
            foreach ($validatedData['tests'] as $test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }

                $molecularReg->molecularTests()->create([
                    'test_id' => $test['test_id'],
                    'test_name' => $molecularTest->test_name,
                    'test_fee' => $molecularTest->test_fee,
                    'test_date' => now()->format('Y-m-d'),
                ]);
            }

            // Commit the transaction
            DB::commit();

            // Redirect back with success message
            return redirect()->route('moleculars.index')->with('success', 'Molecular data updated successfully.');
        } catch (Exception $e) {
            // Rollback the transaction in case of any errors
            DB::rollBack();

            // Log the error and redirect with failure message
            Log::error('Molecular Update failed', ['error' => $e->getMessage()]);
            return redirect()->back()
                ->withErrors(['error' => 'Update failed: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $molecularReg = MolecularReg::find($id);

        if (!$molecularReg) {
            abort(404, 'Record not found.');
        }
        // dd($molecularReg);
        // Proceed with deletion
        $molecularReg->molecularTests()->delete();
        $molecularReg->delete();

        return redirect()->route('moleculars.index')->with('success', 'Record deleted successfully.');
    }

    public function summaryReport(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = MolecularReg::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Molecular/Reports/DateWiseBalanceSummary', [
            'data' => $data
        ]);
    }

    public function summaryDetails(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = MolecularReg::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Molecular/Reports/DateWiseBalanceSummaryDetails', [
            'data' => $data
        ]);
    }

    public function duesCheck(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = MolecularReg::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Molecular/Reports/DuesReport', [
            'data' => $data
        ]);
    }
}
