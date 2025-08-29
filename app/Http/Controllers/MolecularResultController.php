<?php

namespace App\Http\Controllers;

use App\Models\MolecularRegTest;
use App\Http\Requests\StoreMolecularResultRequest;
use App\Http\Requests\UpdateMolecularResultRequest;
use App\Models\MolecularReg;
use App\Models\MolecularResult;
use App\Models\Sample;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $results = MolecularResult::with(['molecularSample', 'molecularReg'])
            ->orderBy('patient_id', 'desc')
            ->get()
            ->groupBy('patient_id')
            ->map(function ($group) {
                return $group->first();
            })
            ->values();

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

        // Fetch the related molecularReg record
        $molecularReg = MolecularReg::where('patient_id', $patient_id)->first();

        return Inertia::render('Molecular/Result/CreateMolecularResult', [
            'tests' => $tests,
            'molecularReg' => $molecularReg, // Pass molecularReg data
            'message' => session('message'),
        ]);
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
            'results.*.pathogen_name_dengue' => 'nullable|string',
            'results.*.pathogen_name_chikungunya' => 'nullable|string',
            'results.*.pathogen_name_zika' => 'nullable|string',
            'results.*.dengue_result' => 'nullable|string',
            'results.*.chikungunya_result' => 'nullable|string',
            'results.*.zika_result' => 'nullable|string',
            'results.*.results' => 'nullable|string',
            'results.*.unit' => 'nullable|string',
            'results.*.result_copies' => 'nullable|string',
            'results.*.report_date' => 'required|date_format:Y-m-d H:i:s',
            'results.*.methodology' => 'nullable|string',
            'results.*.remarks' => 'nullable|string',
            'results.*.comments' => 'nullable|string',
        ]);

        $exists = false;
        $userName = Auth::user()->name;

        foreach ($request->results as $result) {
            $existingResult = MolecularResult::where('patient_id', $result['patient_id'])
            ->where('test_id', $result['test_id'])
            ->exists();

            if ($existingResult) {
                $exists = true;
                continue;
            }

            // Generate a unique result ID
            $resultId = $this->generateMolecularResultId();

            MolecularResult::create([
                'result_id' => $resultId,
                'sample_id' => $result['sample_id'],
                'patient_id' => $result['patient_id'],
                'test_id' => $result['test_id'],
                'result_status' => $result['result_status'],
                'specimen' => $result['specimen'],
                'investigation' => $result['investigation'],
                'results' => $result['results'] ?? null,
                'pathogen_name_dengue'       => 'Dengue Virus RNA',
                'pathogen_name_chikungunya'  => 'Chikungunya Virus RNA',
                'pathogen_name_zika'         => 'Zika Virus RNA',
                'dengue_result'      => $result['dengue_result'] ?? null,
                'chikungunya_result' => $result['chikungunya_result'] ?? null,
                'zika_result'        => $result['zika_result'] ?? null,
                'unit' => $result['unit'] ?? null,
                'result_copies' => $result['result_copies'] ?? null,
                'report_date' => $result['report_date'] ?? null,
                'methodology' => $result['methodology'] ?? null,
                'remarks' => $result['remarks'] ?? null,
                'comments' => $result['comments'] ?? null,
                'user_name' => $userName,
            ]);
        }

        if ($exists) {
            return redirect()->route('results.index')
            ->with('error', 'Some data already exists for patient_id and test_id.');
        }

        return redirect()->route('results.index')
        ->with('message', 'Results saved successfully.');
    }

    private function generateMolecularResultId()
    {
        $prefix = 'RID';
        $currentDate = now()->format('ymd');
        $serialNumber = 0;

        do {
            DB::beginTransaction();

            try {
                $latestRegId = DB::table('molecular_results')
                ->where('result_id', 'like', "$prefix-$currentDate-%")
                ->lockForUpdate() // Lock the rows to prevent race conditions
                    ->max('result_id');

                $serialNumber = $latestRegId ? intval(substr($latestRegId, -3)) + 1 : 1;

                $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);
                $newRegId = "$prefix-$currentDate-$serialNumberFormatted";

                if (!MolecularResult::where('result_id', $newRegId)->exists()) {
                    DB::commit();
                    return $newRegId;
                }

                DB::rollBack();
            } catch (Exception $e) {
                DB::rollBack();
                throw new Exception('Error generating result ID: ' . $e->getMessage());
            }
        } while (true);
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
                'results' => 'nullable|string',
                'unit' => 'nullable|string',
                'result_copies' => 'nullable|string',
                'report_date' => 'nullable|date',
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

    public function generateReportWithSign($patientId)
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
        return Inertia::render('Molecular/Result/ReportWithSign', [
            'tests' => $tests,
            'sample' => $sample,
            'patient' => $sample->patient, // Pass patient details separately if needed
        ]);
    }
}
