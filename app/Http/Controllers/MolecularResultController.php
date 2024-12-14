<?php

namespace App\Http\Controllers;

use App\Models\MolecularResult;
use App\Models\MolecularReg;
use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularResultRequest;
use App\Http\Requests\UpdateMolecularResultRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MolecularResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $results = MolecularResult::where('patient_id', $request->patientId)->get(); // Fetch results by patient ID
        return Inertia::render('Molecular/ViewMolecularResult', ['results' => $results]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($patient_id)
    {
        // dd($patient_id);
        $patient = MolecularReg::findOrFail($patient_id); // Ensure the patient exists
        $tests = MolecularRegTest::where('patient_id', $patientId)->get(); // Get tests related to the patient

        return Inertia::render('Molecular/Result/CreateMolecularResult', [
        'patient' => $patient,
        'tests' => $tests,
    ]);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMolecularResultRequest $request)
    {
        $validated = $request->validated();
        
        // If storing a single result
        MolecularResult::create([
            'investigation' => $validated['investigation'],
            'result' => $validated['result'],
            'unit' => $validated['unit'],
            'methodology' => $validated['methodology'],
            'remarks' => $validated['remarks'],
            'comments' => $validated['comments'],
            'user_name' => $validated['user_name'],
            'patient_id' => $validated['patient_id'] // Assuming you have a `patient_id` field
        ]);
        
        return redirect()->route('results.index')->with('message', 'Result saved successfully!');
    }

    // Store multiple results for a patient
    public function storeMultipleResults(Request $request, $patientId)
    {
        // Validate the incoming array of results
        $validated = $request->validate([
            'results' => 'required|array',
            'results.*.investigation' => 'required|string|max:255',
            'results.*.result' => 'required|string|max:255',
            'results.*.unit' => 'nullable|string|max:50',
            'results.*.methodology' => 'nullable|string|max:255',
            'results.*.remarks' => 'nullable|string|max:500',
            'results.*.comments' => 'nullable|string|max:500',
            'results.*.user_name' => 'required|string|max:255',
        ]);

        // Loop through each result and store it
        foreach ($validated['results'] as $result) {
            MolecularResult::create([
                'investigation' => $result['investigation'],
                'result' => $result['result'],
                'unit' => $result['unit'],
                'methodology' => $result['methodology'],
                'remarks' => $result['remarks'],
                'comments' => $result['comments'],
                'user_name' => $result['user_name'],
                'patient_id' => $patientId,
            ]);
        }

        return redirect()->route('results.index')->with('message', 'Results saved successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(MolecularResult $molecularResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MolecularResult $molecularResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularResultRequest $request, MolecularResult $molecularResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MolecularResult $molecularResult)
    {
        //
    }
}
