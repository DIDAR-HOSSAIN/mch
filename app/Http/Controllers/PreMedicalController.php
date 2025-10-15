<?php

namespace App\Http\Controllers;

use App\Models\PreMedical;
use App\Http\Requests\StorePreMedicalRequest;
use App\Http\Requests\UpdatePreMedicalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreMedicalController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:pre-medical-list|pre-medical-create|pre-medical-edit|pre-medical-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:pre-medical-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:pre-medical-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:pre-medical-delete', ['only' => ['destroy']]);
        // $this->middleware('permission:pre-medical-summary-report', ['only' => ['summaryReport']]);
        // $this->middleware('permission:pre-medical-summary-details', ['only' => ['summaryDetails']]);
        // $this->middleware('permission:pre-medical-due-check', ['only' => ['duesCheck']]);
    }

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $search = $request->get('search');
        $pre_medicals = PreMedical::query()
            ->when(
                $search,
                fn($q) =>
                $q->where('passport_no', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate(10);
        // ->withQueryString();

        return inertia('Gamca/Pre-Medical/ViewPreMedical', [
            'auth' => ['user' => auth()->user()],
            'pre_medicals' => $pre_medicals,
            'filters' => ['search' => $search],
            'flash' => session()->get('flash'),
        ]);
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
            // ✅ Required Fields
            'short_code'        => 'required|string|max:50|unique:pre_medicals,short_code',
            'passport_no'       => 'required|string|max:50',
            'first_name'        => 'required|string|max:100',
            'date_of_issue'     => 'required|date',
            'place_of_issue'    => 'required|string|max:100',
            'date_of_birth'     => 'required|date',
            'sex'               => 'required|in:MALE,FEMALE,OTHER',
            'nationality'       => 'required|string|max:100',
            'religion'          => 'required|string|max:100',
            'profession'        => 'required|string|max:100',
            'mobile_no'         => 'required|string|max:20',
            'country_name'      => 'required|string|max:100',

            // ✅ Optional Fields
            'short_code'        => 'nullable|string|max:50|unique:pre_medicals,short_code',
            'last_name'         => 'nullable|string|max:100',
            'father_name'       => 'nullable|string|max:100',
            'mother_name'       => 'nullable|string|max:100',
            'report_after_days' => 'nullable|integer',
            'report_date'       => 'nullable|date',
            'serial_no'         => 'nullable|string|max:50',
            'amount'            => 'nullable|numeric',
            'is_free'           => 'boolean',
            'discount'          => 'nullable|numeric',
            'gcc_slip_no'       => 'nullable|string|max:50',
            'gcc_slip_date'     => 'nullable|date',
            'expire_days'       => 'nullable|integer',
            'photo'             => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data['passport_validity'] = $request->boolean('passport_validity') ? 10 : 5;

        // ✅ File upload
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('passenger_photos', 'public');
        }

        $preMedical = PreMedical::create($data);

        // ✅ Redirect using the newly created record's ID
        return redirect()->route('premedical.receipt', ['id' => $preMedical->id]);
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
        return Inertia::render('Gamca/Pre-Medical/EditPreMedical', [
            'preMedical' => $preMedical,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePreMedicalRequest $request, PreMedical $preMedical)
    {
        $data = $request->validate([
            'short_code'        => 'nullable|string|max:50',
            'passport_no'       => 'required|string|max:50',
            'passport_validity' => 'boolean',
            'first_name'        => 'required|string|max:100',
            'last_name'         => 'nullable|string|max:100',
            'father_name'       => 'nullable|string|max:100',
            'mother_name'       => 'nullable|string|max:100',
            'date_of_issue'     => 'nullable|date',
            'place_of_issue'    => 'nullable|string|max:100',
            'date_of_birth'     => 'nullable|date',
            'sex'               => 'required|in:MALE,FEMALE,OTHER',
            'nationality'       => 'nullable|string|max:100',
            'religion'          => 'nullable|string|max:100',
            'profession'        => 'nullable|string|max:100',
            'report_after_days' => 'nullable|integer',
            'report_date'       => 'nullable|date',
            'mobile_no'         => 'nullable|string|max:20',
            'serial_no'         => 'nullable|string|max:50',
            'country_name'      => 'nullable|string|max:100',
            'amount'            => 'nullable|numeric',
            'is_free'           => 'boolean',
            'discount'          => 'nullable|numeric',
            'gcc_slip_no'       => 'nullable|string|max:50',
            'gcc_slip_date'     => 'nullable|date',
            'expire_days'       => 'nullable|integer',
            'photo'             => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle checkboxes correctly
        $data['passport_validity'] = $request->boolean('passport_validity');
        $data['is_free'] = $request->boolean('is_free');

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('passenger_photos', 'public');
        }

        $preMedical->update($data);

        return redirect()->route('pre-medical.index')->with('success', '✅ Passenger updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreMedical $preMedical)
    {
        $preMedical->delete();
        return back()->with('success', 'Passenger deleted.');
    }

    public function premedicalMoneyReceipt($id)
    {
        $receipt = PreMedical::findOrFail($id);
        // dd($receipt);

        return Inertia::render('Gamca/Pre-Medical/MoneyReceipt', [
            'receipt' => $receipt,
        ]);
    }
}
