<?php

namespace App\Http\Controllers;

use App\Models\PremedicalSample;
use App\Http\Requests\StorePremedicalSampleRequest;
use App\Http\Requests\UpdatePremedicalSampleRequest;
use App\Models\PreMedical;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PremedicalSampleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $samples = PreMedicalSample::orderBy('id', 'desc')->get();
        $samples = PreMedicalSample::with('preMedical')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Gamca/Sample/ViewSample', [
            'samples' => $samples,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $search = $request->get('search');
        $patient = null;

        if ($search) {
            $patient = PreMedical::where('pre_medical_id', $search)
                ->orWhere('passport_no', $search)
                ->first();
        }

        return Inertia::render('Gamca/Sample/CreateSample', [
            'auth' => ['user' => Auth::user()],
            'patient' => $patient,
            'search' => $search,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'sample' => session('sample'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePremedicalSampleRequest $request)
    {
        $request->validate([
            'pre_medical_id' => 'required|exists:pre_medicals,pre_medical_id',
        ]);

        // Check existing sample
        $existingSample = PreMedicalSample::where('pre_medical_id', $request->pre_medical_id)
            ->whereDate('collection_date', Carbon::today('Asia/Dhaka'))
            ->first();

        if ($existingSample) {
            return redirect()->back()->with([
                'error' => 'Sample already collected!',
            ]);
        }

        // 🆔 Barcode number = Patient ID itself (for scanner readability)
        $barcode = $request->pre_medical_id;

        // Create new sample
        $sample = PreMedicalSample::create([
            'pre_medical_id' => $request->pre_medical_id,
            'collection_date' => Carbon::now('Asia/Dhaka')->toDateString(),
            'barcode_no' => $barcode,
            'user_name' => Auth::user()->name,
        ]);

        return redirect()->back()->with([
            'success' => 'Sample created successfully!',
            'sample' => $sample,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PremedicalSample $premedicalSample)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PremedicalSample $premedicalSample)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePremedicalSampleRequest $request, PremedicalSample $premedicalSample)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PremedicalSample $premedicalSample)
    {
        //
    }
}
