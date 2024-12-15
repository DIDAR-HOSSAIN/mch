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
            'results.*.patient_id' => 'required|string|max:255',
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
                'patient_id' => $result['patient_id'],
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
        ->select('id', 'patient_id', 'test_name', 'test_id', 'test_date', 'test_fee')
        ->get();

        // dd($tests);

        return Inertia::render('Molecular/Result/CreateMolecularResult', ['tests'=> $tests]);

        return response()->json([
        'tests' => $tests
        ]);
    }


    public function generateReport($patientId)
    {
        // Fetch the patient details using the patient_id
        $patient = MolecularReg::where('patient_id', $patientId)->firstOrFail();

        // Fetch molecular test results for the patient using patient_id
        // $results = MolecularResult::where('patient_id', $patientId)->get();
        $results = MolecularResult::where('patient_id', $patientId)->get(); 

        $results = MolecularResult::all();

        // dd($results);


        // Check if results exist to avoid fetching unnecessary sample data when no results are found
        if ($results->isEmpty()) {
            $sample = []; // If no results, no sample data needs to be fetched
        } else {
            // Optionally, fetch sample information based on the results
            $sample = Sample::whereIn('sample_id', $results->pluck('sample_id'))->get();
        }

        // Render the React page with patient details, test results, and sample data
        return Inertia::render('Molecular/Result/Report', [
            'patient' => $patient,
            'results' => $results,
            'sample' => $sample, // Pass samples if available
        ]);
    }









}
