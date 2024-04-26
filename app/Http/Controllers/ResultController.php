<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\UpdateResultRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $results = Result::all();
        // // dd($results);
        // return Inertia::render('Dope/Result/ViewList', ['results' => $results]);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Result::query();

        if ($startDate && $endDate) {
            // Make sure to convert the string dates to DateTime objects
            $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('result_date', [$startDate, $endDate]);
        }

        $results = $query->get();

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
        Validator::make($request->all(), [
            'sample_id' => ['required'],
            'patient_id' => ['required'],
            'name' => ['required'],
            'result_date' => ['required'],
            'alcohol' => ['required'],
            'benzodiazepines' => ['required'],
            'cannabinoids' => ['required'],
            'amphetamine' => ['required'],
            'opiates' => ['required'],
            'status' => ['required'],
            'remarks' => ['required'],
        ])->validate();

        $data = $request->all();

        // Check if there is an authenticated user
        if ($user = Auth::user()) {
            // Access user properties safely
            $data['user_name'] = $user->name;
        } else {
            // Handle the case where there is no authenticated user
            // For example, you could set a default value or return an error response
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        Result::create($data);

        // Redirect to the money invoice route with the ID
        // return Redirect::route('dope-inv', ['id' => $dope->id]);

        return Redirect::back()->with('message', 'Operation Successful !');
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
        $report = Result::find($id);

        return Inertia::render('Dope/Result/Report', ['report' => $report]);
    }

    public function updateReport()
    {
        return Inertia::render('Dope/Result/ApproveReport');
    }

    public function updateStatus(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $status = $request->input('status');

        // Fetch records between the specified dates
        $results = Result::whereBetween('result_date', [$startDate, $endDate])->get();

        // Update each record with the new status while keeping other fields intact
        foreach ($results as $result) {
            // Update status only if it's different from the new status
            if ($result->status != $status) {
                $result->status = $status; // Update status
                $result->save(); // Save the changes
            }
        }

        return response()->json(['success' => true]);
    }




}
