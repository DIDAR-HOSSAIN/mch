<?php

namespace App\Http\Controllers;

use App\Models\MolecularReg;
use App\Models\MolecularTest;
use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularRegRequest;
use App\Http\Requests\UpdateMolecularRegRequest;
use Inertia\Inertia;
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
        return Inertia::render('Patients/Index', [
            'patients' => Patient::with('patientTests.test')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tests = MolecularTest::select('id', 'test_name', 'test_fee')->get();
        return Inertia::render('Molecular/CreateMolecular', ['tests' => $tests]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMolecularRegRequest $request)
    {
        // Validate incoming request
    $validatedData = $request->validated();

    try {
        Log::info('Molecular registration started', $validatedData);

        // Start a database transaction to ensure consistency
        DB::beginTransaction();

        // Step 1: Generate Molecular Registration ID
        $molecularRegId = $this->generateMolecularRegId();

        // Step 2: Create MolecularReg record
        $molecularReg = MolecularReg::create([
            'patient_id' => $molecularRegId,
            'name' => $request->name,
            'contact_no' => $request->contact_no,
            'age' => $request->age,
            'gender' => $request->gender,
            'discount' => $request->discount,
            'paid' => $request->paid,
        ]);

        Log::info('Molecular Registration created', ['patient_id' => $molecularReg->patient_id]);

        // Step 3: Iterate through tests and create MolecularRegTest records
        foreach ($request->tests as $test) {
            $molecularTest = MolecularTest::find($test['test_id']);
            if (!$molecularTest) {
                throw new Exception('Test not found: ' . $test['test_id']);
            }

            $molecularRegTest = MolecularRegTest::create([
                'patient_id' => $molecularReg->patient_id,
                'test_id' => $test['test_id'],
                'test_name' => $molecularTest->test_name,
                'total' => $test['total'],
                'discount' => $request->discount,
                'paid' => $request->paid,
                'due' => max($test['total'] - $request->paid - $request->discount, 0),
                'entry_date' => now(),
                'user_name' => auth()->check() ? auth()->user()->name : 'demo user',
            ]);

            Log::info('Molecular Test added to Registration', ['molecular_reg_test_id' => $molecularRegTest->id, 'patient_id' => $molecularReg->patient_id]);
        }

        // Commit the transaction if all operations are successful
        DB::commit();

        Log::info('Molecular Registration completed successfully!', ['patient_id' => $molecularReg->patient_id]);

        // Return a JSON response with the molecular registration ID and success message
        return response()->json([
            'patient_id' => $molecularReg->patient_id,
            'message' => 'Molecular Registration placed successfully!'
        ], 201);

    } catch (Exception $e) {
        // Rollback the transaction in case of an error
        DB::rollBack();
        Log::error('Molecular Registration Failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);

        // Return error response
        return response()->json([
            'error' => 'Molecular Registration Failed!',
            'message' => $e->getMessage()
        ], 500);
    }
}

// Generate a unique Molecular Registration ID
private function generateMolecularRegId()
{
    $prefix = 'MR';
    $currentDate = now()->format('ymd');

    // Loop until a unique patient_id is generated
    do {
        // Get the maximum patient_id for the current date
        $latestRegId = DB::table('molecular_regs')
            ->where('patient_id', 'like', "$prefix-$currentDate-%")
            ->max('patient_id');

        // If there are existing records, extract the serial number and increment
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
    public function show(MolecularReg $molecularReg)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MolecularReg $molecularReg)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularRegRequest $request, MolecularReg $molecularReg)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MolecularReg $molecularReg)
    {
        //
    }
}
