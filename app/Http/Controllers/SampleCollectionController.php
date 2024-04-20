<?php

namespace App\Http\Controllers;

use App\Models\SampleCollection;
use App\Http\Requests\StoreSampleCollectionRequest;
use App\Http\Requests\UpdateSampleCollectionRequest;
use App\Models\Dope;
use App\Models\Result;
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
        $dopeIds = Dope::all();
        // dd($dopeIds);
        return Inertia::render('Dope/Sample/CreateForm', ['dopeIds' => $dopeIds]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSampleCollectionRequest $request)
    {

        // Validator::make($request->all(), [
        //     'patient_id' => ['required'],
        //     'name' => ['required'],
        //     'sample_collection_date' => ['required'],
        //     'status' => ['required'],
        // ])->validate();

        // $request->validate([
        //     'name' => 'required',
        //     'detail' => 'required',
        // ]);

        SampleCollection::create($request->all());
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
