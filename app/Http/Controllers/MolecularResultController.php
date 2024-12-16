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
            'results.*.test_id' => 'required|string|max:255',
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
                'test_id' => $result['test_id'],
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


    public function generateReport($testId)
    {
        // Fetch the specific test with its results
        $test = MolecularRegTest::where('test_id', $testId)
            ->with('molecularResults') // Eager load related results
            ->firstOrFail();

        return Inertia::render('Molecular/Result/Report', [
            'test' => $test,
            'results' => $test->molecularResults, // Pass results to the view
        ]);
    }


}
