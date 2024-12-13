<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use App\Http\Requests\StoreSampleRequest;
use App\Http\Requests\UpdateSampleRequest;
use Inertia\Inertia;
use App\Models\MolecularReg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class SampleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $molecularSamples = Sample::all();
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

        // Generate a unique sample_id
        $data['sample_id'] = $this->generateMolecularRegId();

        // Add authenticated user details
        $data['user_name'] = Auth::user()->name;

        // Create the sample in the database
        Sample::create($data);

        // Redirect with success message
        return redirect()->route('samples.index')->with('success', 'Sample created successfully.');
    }

    /**
     * Generate a unique Molecular Registration ID for the sample.
     */
    private function generateMolecularRegId()
    {
        $prefix = 'SID';
        $currentDate = now()->format('ymd');

        do {
            // Get the maximum sample_id for the current date
            $latestSampleId = DB::table('samples')
            ->where('sample_id', 'like', "$prefix-$currentDate-%")
            ->max('sample_id');

            // Extract and increment the serial number
            $serialNumber = $latestSampleId ? intval(substr($latestSampleId, -3)) + 1 : 1;

            // Format the serial number with leading zeros
            $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);

            // Generate the new sample_id
            $newSampleId = "$prefix-$currentDate-$serialNumberFormatted";
        } while (DB::table('samples')->where('sample_id', $newSampleId)->exists());

        return $newSampleId;
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
        return Inertia::render('Molecular/Sample/EditMolecularSample', ['sample' => $sample]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSampleRequest $request, Sample $sample)
    {
        // Validate the input data
        Validator::make($request->all(), [
            'patient_id' => 'required|string|exists:molecular_regs,patient_id',
            'collection_date' => 'required|date',
            'received_date' => 'nullable|date',
            'received_by' => 'nullable|string|max:255',
            'collection_status' => 'required|in:Pending,Collected,Failed',
            'received_status' => 'nullable|in:Pending,Received,Rejected',
            'remarks' => 'nullable|string',
        ])->validate();

        // Update the sample with the validated data
        $data = $request->all();
        $data['user_name'] = Auth::user()->name; // Update the user who modified the data
        $sample->update($data);

        // Redirect to the index page with a success message
        return redirect()->route('samples.index')->with('success', 'Sample updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sample $sample)
    {
        //
    }

    public function sampleCreate()
    {
        // Fetch samples with 'Collected' status but exclude those with a 'Received' status
        $collectedSamples = Sample::where('collection_status', 'Collected')
            ->where('received_status', '<>', 'Received') // Exclude samples already marked as received
            ->get(['id', 'patient_id', 'name', 'collection_date', 'collection_status']);

        return Inertia::render('Molecular/Sample/SampleReceive', ['collectedSamples' => $collectedSamples]);
    }

    public function updateReceive(Request $request, $id)
    {
        $validated = $request->validate([
            'received_date' => 'required|date',
            'received_by' => 'required|string|max:255',
            'received_status' => 'required|string|max:255',
            'remarks' => 'nullable|string|max:500',
        ]);

        $sample = Sample::findOrFail($id);
        $sample->update($validated);

        return redirect()->back()->with('success', 'Sample updated successfully.');
    }

    


}
