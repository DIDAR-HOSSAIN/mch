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
        DB::beginTransaction();

        try {
            // Validate the request
            $validator = Validator::make($request->all(), [
                'bill_no' => 'nullable|string|max:25|unique:molecular_regs,bill_no',
                'name' => 'required|string|max:100',
                'contact_no' => 'required|string|max:15',
                'age' => 'required|integer|min:0',
                'age_type' => 'required|in:Y,M',
                'test_advised' => 'required|in:HLA B27,HBV DNA,HCV RNA,HPV DNA',
                'gender' => 'required|in:Male,Female,Other',
                'discount' => 'required|numeric|min:0',
                'paid' => 'required|numeric|min:0',
                'reference_name' => 'nullable|string|max:100',
                'remarks' => 'nullable|string|max:50',
                'payment_type' => 'required|string|in:Cash,Cheque,Card,Bkash,Rocket,Nagod,Internet Banking,Mobile Banking,Others',
                'account_head' => 'required|string|max:100',
                'tests' => 'required|array|min:1',
                'tests.*.test_id' => 'required|exists:molecular_tests,id',
            ]);

            if ($validator->fails()) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }

            $data = $request->all();

            // Generate a unique patient ID
            $data['patient_id'] = $this->generateMolecularRegId();

            // Set the logged-in user's name
            $data['user_name'] = Auth::user()->name ?? 'Unknown';

            // Set registration date and financials
            $data['reg_date'] = $data['reg_date'] ?? now()->toDateString();
            $data['total'] = collect($data['tests'])->sum(function ($test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }
                return $molecularTest->test_fee;
            });
            $data['discount'] = (float) $data['discount'];
            $data['paid'] = (float) $data['paid'];
            $data['due'] = max($data['total'] - $data['discount'] - $data['paid'], 0);
            $data['net_payable'] = $data['total'] - $data['discount'];

            // Create the MolecularReg record
            $molecularReg = MolecularReg::create($data);

            // Prepare tests for insertion
            $tests = collect($data['tests'])->map(function ($test) use ($molecularReg) {
                $molecularTest = MolecularTest::find($test['test_id']);
                return [
                    'patient_id' => $molecularReg->patient_id,
                    'test_id' => $molecularTest->id,
                    'test_name' => $molecularTest->test_name,
                    'test_fee' => $molecularTest->test_fee,
                    'test_date' => now()->toDateString(),
                ];
            })->toArray();

            // Insert test data
            MolecularRegTest::insert($tests);

            DB::commit();

            return redirect()->route('molecular-inv', ['patient_id' => $molecularReg->patient_id])
                ->with('success', 'Molecular Registration completed successfully!');
        } catch (Exception $e) {
            DB::rollBack();

            Log::error('Molecular Registration failed', ['error' => $e->getMessage()]);

            return redirect()->back()
                ->with('error', 'Molecular Registration failed! Error: ' . $e->getMessage());
        }
    }

    /**
     * Generate a unique Molecular Registration ID.
     */
    private function generateMolecularRegId()
    {
        $prefix = 'MCHM';
        $currentDate = now()->format('ymd');
        $serialNumber = 1;

        $latestRegId = MolecularReg::where('patient_id', 'like', "$prefix-$currentDate-%")
            ->latest('patient_id')
            ->value('patient_id');

        if ($latestRegId) {
            $serialNumber = intval(substr($latestRegId, -3)) + 1;
        }

        $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);
        return "$prefix-$currentDate-$serialNumberFormatted";
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
                'age_type' => 'required|in:Y,M',
                'test_advised' => 'required|in:HLA B27,HBV DNA,HCV RNA,HPV DNA',
                'gender' => 'required|in:Male,Female,Other',
                'bill_no' => 'nullable|string|max:255',
                'tests' => 'required|array',
                'tests.*.test_id' => 'required|exists:molecular_tests,id',
                'discount' => 'required|numeric|min:0',
                'paid' => 'required|numeric|min:0',
                'account_head' => 'nullable|string|max:255',
                'payment_type' => 'nullable|string|max:255',
                'remarks' => 'nullable|string|max:50',
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
                'age_type' => $validatedData['age_type'],
                'test_advised' => $validatedData['test_advised'],
                'gender' => $validatedData['gender'],
                'bill_no' => $validatedData['bill_no'],
                'discount' => $validatedData['discount'],
                'paid' => $validatedData['paid'],
                'total' => $totalAmount,
                'net_payable' => $netPayable,
                'due' => $dueAmount,
                'account_head' => $validatedData['account_head'] ?? 'Cash in hand',
                'payment_type' => $validatedData['payment_type'],
                'reference_name' => $validatedData['reference_name'],
                'remarks' => $validatedData['remarks'],
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
        // Find the molecular registration by ID
        $molecularReg = MolecularReg::find($id);

        if (!$molecularReg) {
            abort(404, 'Record not found.');
        }

        // Get the patient_id
        $patientId = $molecularReg->patient_id;

        // Delete related records directly using query builder
        DB::table('molecular_reg_tests')->where('patient_id', $patientId)->delete();
        DB::table('samples')->where('patient_id', $patientId)->delete();
        DB::table('molecular_results')->where('patient_id', $patientId)->delete();

        // Delete all molecular_regs records for the same patient_id
        DB::table('molecular_regs')->where('patient_id', $patientId)->delete();

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
