<?php

namespace App\Http\Controllers;

use App\Models\MolecularReg;
use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularResultRequest;
use App\Http\Requests\UpdateMolecularResultRequest;
use App\Models\MolecularResult;
use App\Models\Sample;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MolecularResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = MolecularResult:: with('molecularSample')->get();

        // $results = MolecularResult::orderBy('id', 'desc')->get();
        return Inertia::render('Molecular/Result/ViewMolecularResult', ['results' => $results]);
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
            'results.*.sample_id' => 'required|string',
            'results.*.patient_id' => 'required|string',
            'results.*.test_id' => 'required|integer',
            'results.*.result_status' => 'required|string',
            'results.*.specimen' => 'required|string',
            'results.*.investigation' => 'required|string',
            'results.*.result' => 'nullable|string',
            'results.*.unit' => 'nullable|string',
            'results.*.result_copies' => 'nullable|string',
            'results.*.methodology' => 'nullable|string',
            'results.*.remarks' => 'nullable|string',
            'results.*.comments' => 'nullable|string',
        ]);        
        
        $results = $request->input('results');

        foreach ($request->results as $result) {
            MolecularResult::create([
                'sample_id' => $result['sample_id'],
                'patient_id' => $result['patient_id'],
                'test_id' => $result['test_id'],
                'result_status' => $result['result_status'],
                'specimen' => $result['specimen'],
                'investigation' => $result['investigation'],
                'result' => $result['result'] ?? null,
                'unit' => $result['unit'] ?? null,
                'result_copies' => $result['result_copies'] ?? null,
                'methodology' => $result['methodology'] ?? null,
                'remarks' => $result['remarks'] ?? null,
                'comments' => $result['comments'] ?? null,
            ]);
        }
        

        return redirect()->back()->with('success', 'Results saved successfully.');
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
         ->with('sample')
        ->select('id', 'patient_id', 'test_name', 'test_id', 'test_date', 'test_fee')
        ->get();

        // dd($tests);

        return Inertia::render('Molecular/Result/CreateMolecularResult', ['tests'=> $tests]);
    }

    public function generateReport($patientId)
    {
        // Fetch molecular test results
        $tests = MolecularResult::where('patient_id', $patientId)
            ->with('molecularRegTest') // Include test details
            ->get();

        // Fetch sample details and include patient relationship
        $sample = Sample::where('patient_id', $patientId)
            ->with('molecularPatientReg') // Include related patient details
            ->firstOrFail();

        // Render the Inertia view with the necessary data
        return Inertia::render('Molecular/Result/Report', [
            'tests' => $tests,
            'sample' => $sample,
            'patient' => $sample->patient, // Pass patient details separately if needed
        ]);
    }





}
