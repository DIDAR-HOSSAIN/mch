<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use App\Http\Requests\StoreSampleRequest;
use App\Http\Requests\UpdateSampleRequest;
use Inertia\Inertia;
use App\Models\MolecularRegTest;
use App\Models\MolecularReg;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class SampleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $molecularSamples = MolecularRegTest::all();
        return Inertia::render('Molecular/Sample/ViewMolecularSample', ['molecularSamples' => $molecularSamples]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $existingPatientIds = Sample::pluck('patient_id')->toArray();

        $regIds = MolecularReg::whereNotIn('patient_id', $existingPatientIds)->get();
        return Inertia::render('Molecular/Sample/CreateMolecularSample', [ 'regIds' => $regIds ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSampleRequest $request)
    {
        Validator::make($request->all(), [
            'patient_id' => 'required|string|exists:molecular_regs,patient_id',
            'collection_date' => 'required|date',
            'received_date' => 'nullable|date',
            'received_by' => 'nullable|string|max:255',
            'collection_status' => 'required|in:Pending,Collected,Failed',
            'received_status' => 'nullable|in:Pending,Received,Rejected',
            'remarks' => 'nullable|string',
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
        
            Sample::create($data);
        
            return redirect()->route('sample.index')->with('success', 'Sample created successfully.');
       
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
