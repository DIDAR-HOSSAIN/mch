<?php

namespace App\Http\Controllers;

use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularResultRequest;
use App\Http\Requests\UpdateMolecularResultRequest;
use App\Models\MolecularResult;
use App\Models\Sample;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class MolecularResultController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:molecular-result-list|molecular-result-create|molecular-result-edit|molecular-result-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:molecular-result-create', ['only' => ['create', 'molecularResultCreate', 'store']]);
        $this->middleware('permission:molecular-result-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:molecular-result-delete', ['only' => ['destroy']]);
        $this->middleware('permission:molecular-result-report', ['only' => ['generateReport']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all results with relationships
        $results = MolecularResult::with(['molecularSample', 'molecularReg'])
            ->get()
            ->groupBy('patient_id') // Group by patient_id
            ->map(function ($group) {
                return $group->first(); // Keep only the first record of each group
            })
            ->values(); // Reset keys after grouping

        // Pass the grouped results to the frontend
        return Inertia::render('Molecular/Result/ViewMolecularResult', [
            'results' => $results,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('Molecular/Result/CreateMolecularResult');
    }

    public function molecularResultCreate($patient_id)
    {
        $tests = MolecularRegTest::where('patient_id', $patient_id)
            ->with('sample')
            ->select('id', 'patient_id', 'test_name', 'test_id', 'test_date', 'test_fee')
            ->get();

        // dd($tests);

        return Inertia::render('Molecular/Result/CreateMolecularResult', ['tests' => $tests, 'message' => session('message'),]);
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
    
        $exists = false;
    
        foreach ($request->results as $result) {
            $existingResult = MolecularResult::where('patient_id', $result['patient_id'])
                                             ->where('test_id', $result['test_id'])
                                             ->exists();
    
            if ($existingResult) {
                $exists = true;
                continue;
            }
    
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
    
        if ($exists) {
            return redirect()->route('results.index')
                             ->with('error', 'Some data already exists for patient_id and test_id.');
        }
    
        return redirect()->route('results.index')
                         ->with('message', 'Results saved successfully.');
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
    public function edit($patientId)
    {
        $molecularResults = MolecularResult::where('patient_id', $patientId)->get();
        if ($molecularResults->isEmpty()) {
            return redirect()->route('results.index')->with('error', 'Results not found');
        }



        // Return the results to the frontend
        return Inertia::render('Molecular/Result/EditMolecularResult', [
            'molecularResults' => $molecularResults,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularResultRequest $request, MolecularResult $molecularResult)
    {
        $results = $request->input('results');
        foreach ($results as $result) {
            $validated = Validator::make($result, [
                'sample_id' => 'required|string',
                'patient_id' => 'required|string',
                'test_id' => 'required|integer',
                'result_status' => 'required|string',
                'specimen' => 'required|string',
                'investigation' => 'required|string',
                'result' => 'nullable|string',
                'unit' => 'nullable|string',
                'result_copies' => 'nullable|string',
                'methodology' => 'nullable|string',
                'remarks' => 'nullable|string',
                'comments' => 'nullable|string',
            ])->validate();

            $existingResult = MolecularResult::findOrFail($result['id']);
            $existingResult->update($validated);
        }

        return redirect()->back()->with('success', 'Results updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $result = MolecularResult::findOrFail($id);

        try {
            $result->delete();
            // Redirect with success message
            return redirect()->route('results.index')->with('success', 'Result deleted successfully.');
        } catch (\Exception $e) {
            // Redirect with error message
            return redirect()->route('results.index')->with('error', 'Error deleting result: ' . $e->getMessage());
        }
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
