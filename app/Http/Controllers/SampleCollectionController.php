<?php

namespace App\Http\Controllers;

use App\Models\SampleCollection;
use App\Http\Requests\StoreSampleCollectionRequest;
use App\Http\Requests\UpdateSampleCollectionRequest;
use App\Models\Dope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SampleCollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $samples = SampleCollection::all();
        // dd($samples);
        return Inertia::render('Dope/Sample/ViewList', ['samples' => $samples]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dope/Sample/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSampleCollectionRequest $request)
    {
        $validatedData = $request->validate([
            'patient_id' => ['required'],
            'name' => ['required'],
            'sample_collection_date' => ['required'],
            'status' => ['required'],
            // 'remarks' => ['required'],
        ]);

        // Check if the patient_id exists in the dopes table
        if (!Dope::where('patient_id', $validatedData['patient_id'])->exists()) {
            return redirect()->back()->withErrors(['patient_id' => 'The patient ID is invalid.']);
        }

        // Add user_name to data
        if ($user = Auth::user()) {
            $validatedData['user_name'] = $user->name;
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Create SampleCollection record
        SampleCollection::create($validatedData);

        return Redirect::back()->with('message', 'Operation Successful !');
    }

    /**
     * Display the specified resource.
     */
    public function show(SampleCollection $sampleCollection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SampleCollection $sampleCollection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSampleCollectionRequest $request, SampleCollection $sampleCollection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SampleCollection $sampleCollection)
    {
        //
    }
}
