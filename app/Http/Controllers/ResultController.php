<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\UpdateResultRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // $query = Result::query();
        $query = Result::with('dope');

        if ($startDate && $endDate) {
            // Make sure to convert the string dates to DateTime objects
            $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('result_date', [$startDate, $endDate]);
        }

        $results = $query->orderBy('id', 'desc')->latest()->get();
        // dd($results);

        return Inertia::render('Dope/Result/ViewList', ['results' => $results]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dope/Result/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResultRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Result $result)
    {
        return Inertia::render('Dope/Result/ShowDetails', ['result' => $result]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Result $result)
    {
        $result = Result::find($result->id);
    // dd($result);
        return Inertia::render('Dope/Result/EditForm', ['result' => $result]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResultRequest $request, Result $result)
    {
        // Parse date fields if present
        $dateFields = ['result_date'];

        foreach ($dateFields as $field) {
            if ($request->has($field)) {
                $request->merge([$field => Carbon::parse($request->input($field))->toDateString()]);
            }
        }

        // Update the sample collection record
        $result->update($request->all());

        // Redirect the user to the index page after the update
        return redirect()->route('result.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Result $result)
    {
        Result::find($result->id)->delete();
        return redirect()->route('result.index');
    }

    public function dopeReport($id)
    {
        $reports = Result::with('dope')->find($id);
        // dd($report);
        return Inertia::render('Dope/Result/Report', ['reports' => $reports]);
    }

    public function updateReport()
    {
        return Inertia::render('Dope/Result/ApproveReport');
    }


    public function updateStatus(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $result_status = $request->input('result_status');

        // Fetch records between the specified dates
        $results = Result::whereBetween('result_date', [$startDate, $endDate])->get();

        if ($results->isEmpty()) {
            return response()->json(['error' => true, 'message' => 'No data found for the given date range.']);
        }

        // Update each record with the new result_status while keeping other fields intact
        foreach ($results as $result) {
            // Update result_status only if it's different from the new result_status
            if ($result->result_status != $result_status) {
                $result->result_status = $result_status; // Update status
                $result->save(); // Save the changes
            }
        }

        return response()->json(['success' => true, 'message' => 'Results updated successfully']);
    }

    
    public function fetchByPatientId($patient_id)
    {
        $result = Result::where('patient_id', $patient_id)->first();

        if ($result) {
            return response()->json(['result' => $result], 200);
        } else {
            return response()->json(['message' => 'No results found for this Patient ID'], 404);
        }
    }


    public function updateData(Request $request, $result)
    {
        $result = Result::findOrFail($result);

        $validatedData = $request->validate([
            'sample_id' => 'required',
            'patient_id' => 'required',
            'name' => 'required',
            'result_date' => 'required|date',
            'alcohol' => 'required|in:Negative,Positive',
            'benzodiazepines' => 'required|in:Negative,Positive',
            'cannabinoids' => 'required|in:Negative,Positive',
            'amphetamine' => 'required|in:Negative,Positive',
            'opiates' => 'required|in:Negative,Positive',
            'remarks' => 'nullable',
        ]);

        $result->update($validatedData);

        return response()->json(['message' => 'Result updated successfully']);
    }



}
