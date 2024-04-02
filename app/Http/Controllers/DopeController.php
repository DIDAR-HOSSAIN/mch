<?php

namespace App\Http\Controllers;

use App\Models\Dope;
use App\Http\Requests\StoreDopeRequest;
use App\Http\Requests\UpdateDopeRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

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

        $datas = $query->get();

        return Inertia::render('Dope/ViewList', ['datas' => $datas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dope/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDopeRequest $request)
    {
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
            // For example, you could set a default value or return an error response
            return response()->json(['error' => 'User not authenticated'], 401);
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
        $dateFields = ['dob', 'first_dose_date', 'second_dose_date', 'booster_dose_date', 'entry_date'];
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
        //
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


}
