<?php

namespace App\Http\Controllers;

use App\Models\MolecularReg;
use App\Models\MolecularTest;
use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularRegRequest;
use App\Http\Requests\UpdateMolecularRegRequest;
use App\Models\Reference;
use Inertia\Inertia;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class MolecularRegController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $moleculars = MolecularReg::all();
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
        // Validate incoming request
        $validatedData = $request->validated();

        try {
            Log::info('Molecular registration process started', ['request_data' => $validatedData]);

            // Start a database transaction
            DB::beginTransaction();

            // Step 1: Generate Molecular Registration ID
            $molecularRegId = $this->generateMolecularRegId();

            // Step 2: Check if the patient already has financial data recorded
            $existingReg = MolecularReg::where('patient_id', $molecularRegId)->first();

            if ($existingReg && ($existingReg->discount > 0 || $existingReg->paid > 0 || $existingReg->due > 0)) {
                throw new Exception('Financial data for this patient already exists and cannot be updated.');
            }

            // Step 3: Calculate the total test fees if not provided
            $calculatedTotal = collect($request->tests)->sum(function ($test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }
                return $molecularTest->test_fee;
            });

            $totalAmount = $request->total ?? $calculatedTotal;

            // Step 4: Calculate due amount
            $dueAmount = max($totalAmount - $request->paid - $request->discount, 0);

            $net_payable = $totalAmount - $request->discount;

            // Step 5: Create the MolecularReg record
            $molecularReg = MolecularReg::create([
                'patient_id'    => $molecularRegId,
                'name'          => $request->name,
                'contact_no'    => $request->contact_no,
                'age'           => $request->age,
                'gender'        => $request->gender,
                'discount'      => $request->discount,
                'paid'          => $request->paid,
                'total'         => $totalAmount,
                'net_payable'   => $net_payable,
                'due'           => $dueAmount,
                'reg_date'      => now()->format('Y-m-d'),
                'reference_name' => $request->reference_name,
                'payment_type'  => $request->payment_type,
                'account_head'  => $request->account_head,
                'user_name' => auth()->user()->name,


            ]);

            Log::info('Molecular Registration created', ['patient_id' => $molecularReg->patient_id]);

            // Step 6: Create MolecularRegTest records
            foreach ($request->tests as $test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }

                MolecularRegTest::create([
                    'patient_id' => $molecularReg->patient_id,
                    'test_id'    => $test['test_id'],
                    'test_name'  => $molecularTest->test_name,
                    'test_fee'   => $molecularTest->test_fee,
                    'test_date'  => now()->format('Y-m-d'),
                ]);

                Log::info('Molecular Test added', ['test_id' => $test['test_id'], 'patient_id' => $molecularReg->patient_id]);
            }

            // Commit the transaction
            DB::commit();

            // Redirect to the money receipt page
            return redirect()->route('molecular-inv', ['patient_id' => $molecularReg->patient_id])
                ->with('success', 'Molecular Registration completed successfully!');
        } catch (Exception $e) {
            // Rollback the transaction on error
            DB::rollBack();

            Log::error('Molecular Registration failed', ['error' => $e->getMessage()]);

            // Redirect back with error
            return redirect()->back()
                ->withErrors(['error' => 'Molecular Registration failed: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Generate a unique Molecular Registration ID.
     */
    private function generateMolecularRegId()
    {
        $prefix = 'MCHM';
        $currentDate = now()->format('ymd');

        do {
            // Get the maximum patient_id for the current date
            $latestRegId = DB::table('molecular_regs')
            ->where('patient_id', 'like', "$prefix-$currentDate-%")
            ->max('patient_id');

            // Extract and increment the serial number
            $serialNumber = $latestRegId ? intval(substr($latestRegId, -3)) + 1 : 1;

            // Format the serial number with leading zeros
            $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);

            // Generate the new patient_id
            $newRegId = "$prefix-$currentDate-$serialNumberFormatted";
        } while (MolecularReg::where('patient_id', $newRegId)->exists());

        return $newRegId;
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $molecularReg = MolecularReg::find($id);
        return Inertia::render('Molecular/ShowMolecular', ['molecularReg' => $molecularReg]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $molecularReg = MolecularReg::findOrFail($id);
        // dd($molecularReg);
        $references = Reference::all();
        $tests = MolecularTest::select('id', 'test_name', 'test_fee')->get();
        return Inertia::render('Molecular/EditMolecular', ['molecularReg'=> $molecularReg, 'tests' => $tests, 'references' => $references]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularRegRequest $request, MolecularReg $molecularReg)
    {
        // Validate incoming request
        $validatedData = $request->validated();

        try {
            Log::info('Molecular registration update process started', ['request_data' => $validatedData]);

            // Start a database transaction
            DB::beginTransaction();

            // Step 1: Calculate the total test fees if not provided
            $calculatedTotal = collect($request->tests)->sum(function ($test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }
                return $molecularTest->test_fee;
            });

            $totalAmount = $request->total ?? $calculatedTotal;

            // Step 2: Calculate due amount
            $dueAmount = max($totalAmount - $request->paid - $request->discount, 0);

            $net_payable = $totalAmount - $request->discount;

            // Step 3: Update the MolecularReg record
            $molecularReg->update([
                'name'          => $request->name,
                'contact_no'    => $request->contact_no,
                'age'           => $request->age,
                'gender'        => $request->gender,
                'discount'      => $request->discount,
                'paid'          => $request->paid,
                'total'         => $totalAmount,
                'net_payable'   => $net_payable,
                'due'           => $dueAmount,
                'reg_date'      => now()->format('Y-m-d'),
                'reference_name' => $request->reference_name,
                'payment_type'  => $request->payment_type,
                'account_head'  => $request->account_head,
                'user_name'     => auth()->user()->name,
            ]);

            Log::info('Molecular Registration updated', ['patient_id' => $molecularReg->patient_id]);

            // Step 4: Remove existing tests and add the updated tests
            MolecularRegTest::where('patient_id', $molecularReg->patient_id)->delete();

            foreach ($request->tests as $test) {
                $molecularTest = MolecularTest::find($test['test_id']);
                if (!$molecularTest) {
                    throw new Exception('Test not found: ' . $test['test_id']);
                }

                MolecularRegTest::create([
                    'patient_id' => $molecularReg->patient_id,
                    'test_id'    => $test['test_id'],
                    'test_name'  => $molecularTest->test_name,
                    'test_fee'   => $molecularTest->test_fee,
                    'test_date'  => now()->format('Y-m-d'),
                ]);

                Log::info('Molecular Test added', ['test_id' => $test['test_id'], 'patient_id' => $molecularReg->patient_id]);
            }

            // Commit the transaction
            DB::commit();

            // Redirect to the money receipt page
            return redirect()->route('molecular-inv', ['patient_id' => $molecularReg->patient_id])
                ->with('success', 'Molecular Registration updated successfully!');
        } catch (Exception $e) {
            // Rollback the transaction on error
            DB::rollBack();

            Log::error('Molecular Registration update failed', ['error' => $e->getMessage()]);

            // Redirect back with error
            return redirect()->back()
                ->withErrors(['error' => 'Molecular Registration update failed: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MolecularReg $molecularReg)
    {
        MolecularReg::find($molecularReg->id)->delete();
        return redirect()->route('moleculars.index');
    }

}
