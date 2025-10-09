<?php

namespace App\Http\Controllers;

use App\Models\PreMedical;
use App\Http\Requests\StorePreMedicalRequest;
use App\Http\Requests\UpdatePreMedicalRequest;
use Inertia\Inertia;

class PreMedicalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $passengers = PreMedical::latest()->paginate(20);
        return Inertia::render('Gamca/Pre-Medical/ViewPreMedical', compact('passengers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Gamca/Pre-Medical/CreatePreMedical');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePreMedicalRequest $request)
    {
        $data = $request->validate([
            'short_code' => 'required|string|max:50|unique:pre_medicals,short_code',
            'passport_no' => 'nullable|string|max:50',
            'ten_years' => 'boolean',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'father_name' => 'nullable|string|max:100',
            'mother_name' => 'nullable|string|max:100',
            'date_of_issue' => 'nullable|date',
            'place_of_issue' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            'sex' => 'required|in:MALE,FEMALE,OTHER',
            'nationality' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'profession' => 'nullable|string|max:100',
            'report_date' => 'nullable|date',
            'report_after_days' => 'nullable|integer',
            'mobile_no' => 'nullable|string|max:20',
            'serial_no' => 'nullable|string|max:50',
            'country_name' => 'nullable|string|max:100',
            'amount' => 'nullable|numeric',
            'is_free' => 'boolean',
            'free_amount' => 'nullable|numeric',
            'gcc_slip_no' => 'nullable|string|max:50',
            'gcc_slip_date' => 'nullable|date',
            'expire_days' => 'nullable|integer',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('passenger_photos', 'public');
        }

        PreMedical::create($data);

        return back()->with('success', 'Passenger saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PreMedical $preMedical)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PreMedical $preMedical)
    {
        return Inertia::render('Gamca/Pre-Medical/EditPreMedical', compact('preMedical'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePreMedicalRequest $request, PreMedical $preMedical)
    {
        $data = $request->validate([
            'short_code' => 'required|string|max:50|unique:pre_medicals,short_code,' . $preMedical->id,
            'passport_no' => 'nullable|string|max:50',
            'ten_years' => 'boolean',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'father_name' => 'nullable|string|max:100',
            'mother_name' => 'nullable|string|max:100',
            'date_of_issue' => 'nullable|date',
            'place_of_issue' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            'sex' => 'required|in:MALE,FEMALE,OTHER',
            'nationality' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'profession' => 'nullable|string|max:100',
            'report_date' => 'nullable|date',
            'report_after_days' => 'nullable|integer',
            'mobile_no' => 'nullable|string|max:20',
            'serial_no' => 'nullable|string|max:50',
            'country_name' => 'nullable|string|max:100',
            'amount' => 'nullable|numeric',
            'is_free' => 'boolean',
            'free_amount' => 'nullable|numeric',
            'gcc_slip_no' => 'nullable|string|max:50',
            'gcc_slip_date' => 'nullable|date',
            'expire_days' => 'nullable|integer',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('passenger_photos', 'public');
        }

        $preMedical->update($data);

        return back()->with('success', 'Passenger updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreMedical $preMedical)
    {
        $preMedical->delete();
        return back()->with('success', 'Passenger deleted.');
    }
}
