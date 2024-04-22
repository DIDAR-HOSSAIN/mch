<?php

namespace App\Http\Controllers;

use App\Models\SampleCollection;
use App\Http\Requests\StoreSampleCollectionRequest;
use App\Http\Requests\UpdateSampleCollectionRequest;
use App\Models\Dope;
use App\Models\Result;
use Carbon\Carbon;
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

        $existingPatientIds = SampleCollection::pluck('patient_id')->toArray();

        // Fetch all patient IDs from the Dope model that are not in sample_collections
        $dopeIds = Dope::whereNotIn('patient_id', $existingPatientIds)->get();

        return Inertia::render('Dope/Sample/CreateForm', ['dopeIds' => $dopeIds]);

        // $dopeIds = Dope::all();
        // // dd($dopeIds);
        // return Inertia::render('Dope/Sample/CreateForm', ['dopeIds' => $dopeIds]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSampleCollectionRequest $request)
    {

        Validator::make($request->all(), [
            'patient_id' => ['required'],
            'name' => ['required'],
            'sample_collection_date' => ['required'],
            'status' => ['required'],
        ])->validate();

        // $request->validate([
        //     'name' => 'required',
        //     'detail' => 'required',
        // ]);

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

        $sampleCollection = SampleCollection::create($data);

         // Create Result record with default values
        $result = new Result([
            'sample_id' => $sampleCollection->id,
            'patient_id' => $sampleCollection->patient_id,
            'name' => $sampleCollection->name,
            'result_date' => $sampleCollection->sample_collection_date,
            'alcohol' => 1,
            'benzodiazepines' => 1,
            'cannabinoids' => 1,
            'amphetamine' => 1,
            'opiates' => 1,
            'user_name' => $sampleCollection->user_name,
        ]);

        $result->save();

        // Redirect back with success message
        return redirect()->back()->with('message', 'Operation Successful!');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(SampleCollection $sample)
    {
        // dd($sample);
        return Inertia::render('Dope/Sample/ShowDetails', ['sample' => $sample]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SampleCollection $sample)
    {
        $sampleEdit = SampleCollection::find($sample->id);
        // dd($sampleEdit);
    return Inertia::render('Dope/Sample/EditForm', ['sampleEdit' => $sampleEdit]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSampleCollectionRequest $request, SampleCollection $sample)
    {
        // Parse date fields if present
        $dateFields = ['sample_collection_date'];

        foreach ($dateFields as $field) {
            if ($request->has($field)) {
                $request->merge([$field => Carbon::parse($request->input($field))->toDateString()]);
            }
        }

        // Update the sample collection record
        $sample->update($request->all());

        // Redirect the user to the index page after the update
        return redirect()->route('sample.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        SampleCollection::find($id)->delete();
        return redirect()->route('sample.index');
    }
}
