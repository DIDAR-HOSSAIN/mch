<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use App\Http\Requests\StoreSampleRequest;
use App\Http\Requests\UpdateSampleRequest;

class SampleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Molecular/ViewMolecularSample', ['tests' => $tests, 'references' => $references]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Molecular/CreateMolecularSample', ['tests' => $tests, 'references' => $references]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSampleRequest $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required',
            'sample_code' => 'required|unique:samples',
            'test_id' => 'required',
            'collection_date' => 'required|date',
            'collected_by' => 'required|string',
            'remarks' => 'nullable|string',
        ]);
    
        $validated['status'] = 'Collected';
    
        Sample::create($validated);
    
        return response()->json(['message' => 'Sample collected successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sample $sample)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sample $sample)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSampleRequest $request, Sample $sample)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sample $sample)
    {
        //
    }


    public function receiveSample(Request $request, $id)
    {
        $sample = Sample::findOrFail($id);

        if ($sample->status !== 'Collected') {
            return response()->json(['message' => 'Sample must be in "Collected" status to receive'], 400);
        }

        $sample->update([
            'status' => 'Received',
            'receive_date' => now(),
            'received_by' => $request->received_by,
            'condition' => $request->condition ?? 'Good',
            'remarks' => $request->remarks,
        ]);

        return response()->json(['message' => 'Sample received successfully']);
    }


}
