<?php

namespace App\Http\Controllers;

use App\Models\Dope;
use App\Http\Requests\StoreDopeRequest;
use App\Models\District;
use App\Models\Reference;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DopeController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:dope-list|dope-create|dope-edit|dope-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:dope-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:dope-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:dope-delete', ['only' => ['destroy']]);
        $this->middleware('permission:dope-money-receipt', ['only' => ['moneyReceipt']]);
        $this->middleware('permission:dope-summary-report', ['only' => ['summaryReport']]);
        $this->middleware('permission:dope-summary-details', ['only' => ['summaryDetails']]);
        $this->middleware('permission:dope-due-check', ['only' => ['duesCheck']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Dope::query();

        if ($startDate && $endDate) {
            // Make sure to convert the string dates to DateTime objects
            $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $datas = $query->orderBy('id', 'desc')->latest()->get();

        return Inertia::render('Dope/ViewList', ['datas' => $datas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $districts = District::with('thanas')->get();
        $references = Reference::all();
        // dd($references);
        return Inertia::render('Dope/CreateForm', ['districts' => $districts, 'references' => $references]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDopeRequest $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'brta_form_date' => ['required'],
                'brta_serial_no' => ['required', 'unique:dopes,brta_serial_no'],
                'brta_serial_date' => ['required'],
                'name' => ['required'],
                'fathers_name' => ['required'],
                'mothers_name' => ['required'],
                'contact_no' => ['required'],
                'dob' => ['required', 'date'],
                'sex' => ['required'],
                'test_fee' => ['required', 'numeric'],
                'paid' => ['required', 'numeric'],
                'total' => ['required', 'numeric'],
                'nid' => ['nullable', 'unique:dopes,nid', 'required_without:passport_no'],
                'passport_no' => ['nullable', 'required_without:nid'],
            ], [
                'brta_serial_no.required' => 'BRTA Serial No is required.',
                'brta_serial_no.unique' => 'BRTA Serial No already exists.',
                'name.required' => 'Name is required.',
                'fathers_name.required' => 'Father\'s name is required.',
                'mothers_name.required' => 'Mother\'s name is required.',
                'contact_no.required' => 'Contact number is required.',
                'dob.required' => 'Date of birth is required.',
                'dob.date' => 'Date of birth must be a valid date.',
                'sex.required' => 'Sex is required.',
                'test_fee.required' => 'Test fee is required.',
                'test_fee.numeric' => 'Test fee must be a number.',
                'paid.required' => 'Paid amount is required.',
                'paid.numeric' => 'Paid amount must be a number.',
                'total.required' => 'Total amount is required.',
                'total.numeric' => 'Total amount must be a number.',
                'nid.required_without' => 'Either NID or Passport Number is required.',
                'passport_no.required_without' => 'Either Passport Number or NID is required.',
            ]);

            // Check if validation fails
            if ($validator->fails()) {
                // Return validation errors as JSON response
                return back()->withErrors($validator)->withInput();
            }

            // If validation passes, proceed with data processing
            $data = $request->all();
            // Generate patient_id
            $data['patient_id'] = $this->generatePatientId();
            // Check if there is an authenticated user
            if ($user = Auth::user()) {
                // Access user properties safely
                $data['user_name'] = $user->name;
            } else {
                // Handle the case where there is no authenticated user
                throw new \Exception('User not authenticated');
            }
            // Create Dope record
            $dope = Dope::create($data);

            // Return success response or any additional data as needed
            return redirect()->route('dope-inv', ['id' => $dope->id])->with('success', 'Dope record created successfully.');
        }
         catch (\Exception $e) {
            // Handle exceptions and return appropriate error response
            return back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
    }


    private function generatePatientId()
    {
        $prefix = 'MCHD';
        $currentDate = now()->format('ymd');

        // Loop until a unique patient_id is generated
        do {
            // Get the maximum patient_id for the current date
            $latestPatientId = DB::table('dopes')
            ->where('patient_id', 'like', "MCHD-$currentDate-%")
            ->max('patient_id');

            // If there are existing records for the current date, extract the serial number and increment
            $serialNumber = $latestPatientId ? intval(substr($latestPatientId, -3)) + 1 : 1;

            // Format the serial number with leading zeros
            $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);

            // Generate the new patient_id
            $newPatientId = $prefix . '-' . $currentDate . '-' . $serialNumberFormatted;
        } while (Dope::where('patient_id', $newPatientId)->exists());

        return $newPatientId;

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $dope = Dope::find($id);

        // dd($gpcr); // Uncomment this line for debugging
        return Inertia::render('Dope/ShowDetails', ['dope' => $dope]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $districts = District::with('thanas')->get();
        $dope = Dope::findOrFail($id);

        return Inertia::render('Dope/EditForm', [
            'dope' => $dope,
            'districts' => $districts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {

        // Parse and convert date fields to a compatible format
        $dateFields = ['brta_form_date', 'brta_serial_date','dob','entry_date', 'sample_collection_date',''];
        foreach ($dateFields as $field) {
            if ($request->has($field)) {
                $request->merge([$field => Carbon::parse($request->input($field))->toDateString()]);
            }
        }

        // Update the Gpcr record with the modified request data
        Dope::find($id)->update($request->all());

        // Redirect the user to the index page after the update
        return redirect()->route('dope.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dope $dope)
    {
        Dope::find($dope->id)->delete();
        return redirect()->route('dope.index');
        
    }

    public function moneyReceipt($id)
    {
        $data = Dope::find($id);

        return Inertia::render('Dope/MoneyReceipt', ['data' => $data]);
    }

    public function summaryReport(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Dope::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Dope/Reports/DateWiseBalanceSummary', [
            'data' => $data
        ]);
    }

    public function summaryDetails(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Dope::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Dope/Reports/DateWiseBalanceSummaryDetails', [
            'data' => $data
        ]);
    }

    public function duesCheck(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Dope::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Dope/Reports/DuesReport', [
            'data' => $data
        ]);
    }


}
