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
    public function create()
    {
        // return Inertia::render('Molecular/Result/CreateMolecularResult');
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMolecularResultRequest $request)
    {
        $request->validate([
            'results' => 'required|array',
            'results.*.sample_id' => 'required|string|max:255',
            'results.*.investigation' => 'required|string|max:255',
            'results.*.result' => 'required|string|max:255',
            'results.*.unit' => 'nullable|string|max:255',
            'results.*.methodology' => 'required|string|max:255',
            'results.*.remarks' => 'nullable|string|max:500',
            'results.*.comments' => 'nullable|string|max:500',
        ]);
        
        $results = $request->input('results');

        foreach ($results as $result) {
            MolecularResult::create([
                'sample_id' => $result['sample_id'],
                'investigation' => $result['investigation'],
                'result' => $result['result'],
                'unit' => $result['unit'] ?? null,
                'methodology' => $result['methodology'],
                'remarks' => $result['remarks'] ?? null,
                'comments' => $result['comments'] ?? null,
            ]);
        }

        return redirect()->back()->with('success', 'Results saved successfully.');
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

    public function getPatientTests($patient_id)
    {
    $tests = MolecularRegTest::where('patient_id', $patient_id)
    ->select('id', 'test_name', 'test_id', 'test_date', 'test_fee')
    ->get();

    return Inertia::render('Molecular/Result/CreateMolecularResult', ['tests'=> $tests]);

    return response()->json([
    'tests' => $tests
    ]);
    }
}
