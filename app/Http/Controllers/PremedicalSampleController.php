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
    public function index(Request $request)
    {
        $query = PreMedical::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('pre_medical_id', 'like', "%{$request->search}%")
                    ->orWhere('passport_no', 'like', "%{$request->search}%")
                    ->orWhere('first_name', 'like', "%{$request->search}%");
            });
        }

        $samples = $query->latest()->paginate(10);

        return Inertia::render('Gamca/Sample/ViewSample', [
            'samples' => $samples,
            'search' => $request->search,
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
            'auth' => [
                'user' => Auth::user(),
            ],
            'patient' => $patient,
            'search' => $search,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePremedicalSampleRequest $request)
    {
        $request->validate([
            'pre_medical_id' => 'required',
            'collection_date' => 'required|date',
        ]);

        $barcode = 'PM-' . strtoupper(uniqid());

        $sample = PreMedicalSample::create([
            'pre_medical_id' => $request->pre_medical_id,
            'collection_date' => Carbon::parse($request->collection_date),
            'barcode_no' => $barcode,
            'user_name' => Auth::user()->name,
        ]);

        return redirect()->back()->with('sample', $sample);
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
