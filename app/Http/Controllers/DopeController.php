<?php

namespace App\Http\Controllers;

use App\Models\Dope;
use App\Http\Requests\StoreDopeRequest;
use App\Models\District;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DopeController extends Controller
{
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
        // dd($districts);
        return Inertia::render('Dope/CreateForm', ['districts' => $districts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDopeRequest $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'brta_serial_no' => ['required', 'unique:dopes,brta_serial_no'],
                'brta_serial_date' => ['required'],
                'name' => ['required'],
                'fathers_name' => ['required'],
                'mothers_name' => ['required'],
                'contact_no' => ['required'],
                'dob' => ['required'],
                'sex' => ['required'],
                'test_fee' => ['required'],
                'paid' => ['required'],
                'total' => ['required'],
            ], [
                'brta_serial_no.required' => 'BRTA Serial No is required.',
                'brta_serial_no.unique' => 'BRTA Serial No already exists.',
                // Add error messages for other fields as needed
            ]);

            if ($validator->fails()) {
                throw ValidationException::withMessages($validator->errors()->toArray());
            }

            // Retrieve all data from the request
            $data = $request->all();

            // Generate patient_id
            $data['patient_id'] = $this->generatePatientId();

            // Check if there is an authenticated user
            if ($user = Auth::user()) {
                // Access user properties safely
                $data['user_name'] = $user->name;
            } else {
                // Handle the case where there is no authenticated user
                // For example, you could set a default value or throw an exception
                throw new \Exception('User not authenticated');
            }

            // Convert dob date string to a format that MySQL accepts
            if (isset($data['dob'])) {
                $date = new \DateTime($data['dob']);
                $formattedDate = $date->format('Y-m-d');
                $data['dob'] = $formattedDate;
            }

            // Set entry_date to current date if not provided
            $data['entry_date'] = $data['entry_date'] ?? now()->toDateString();

            // Create Dope record
            $dope = Dope::create($data);

            // Redirect to the money invoice route with the ID
            return Redirect::route('dope-inv', ['id' => $dope->id]);
        } catch (\Exception $e) {
            // Catch any exceptions thrown during the process
            // Return error response with status code 422 (Unprocessable Entity)
            throw ValidationException::withMessages(['error' => $e->getMessage()]);
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
        $dope = Dope::find($id);
        return Inertia::render('Dope/EditForm', ['dope' => $dope]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        // Validator::make($request->all(), [
        //     'title' => ['required'],
        //     'body' => ['required'],
        // ])->validate();

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
