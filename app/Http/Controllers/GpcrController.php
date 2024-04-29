<?php

namespace App\Http\Controllers;

use App\Models\Gpcr;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGpcrRequest;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GpcrController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Gpcr::query();

        if ($startDate && $endDate) {
            // Make sure to convert the string dates to DateTime objects
            $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $datas = $query->orderBy('id', 'desc')->latest()->get();

        return Inertia::render('Gpcr/ViewList', ['datas' => $datas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Gpcr/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGpcrRequest $request)
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

        $data['dob'] = $data['dob'] ?? now()->toDateString();

        // Set entry_date to current date if not provided
        $data['entry_date'] = $data['entry_date'] ?? now()->toDateString();

        // Create Gpcr record
        $gpcr = Gpcr::create($data);

        // Redirect to the money invoice route with the ID
        return Redirect::route('invoice', ['id' => $gpcr->id]);
    }


    private function generatePatientId()
    {
        $prefix = 'MCH';
        $currentDate = now()->format('ymd');

        // Loop until a unique patient_id is generated
        do {
            // Get the maximum patient_id for the current date
            $latestPatientId = DB::table('gpcrs')
                ->where('patient_id', 'like', "MCH-$currentDate-%")
                ->max('patient_id');

            // If there are existing records for the current date, extract the serial number and increment
            $serialNumber = $latestPatientId ? intval(substr($latestPatientId, -3)) + 1 : 1;

            // Format the serial number with leading zeros
            $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);

            // Generate the new patient_id
            $newPatientId = $prefix . '-' . $currentDate . '-' . $serialNumberFormatted;
        } while (Gpcr::where('patient_id', $newPatientId)->exists());

        return $newPatientId;
    }



    /**
     * Display the specified resource.
     */

    public function show($id)
    {
        $gpcr = Gpcr::find($id);
        return Inertia::render('Gpcr/ShowDetails', ['gpcr' => $gpcr]);
    }


    /**
     * Show the form for editing the specified resource.
     */

    public function edit($id)
    {
        $gpcr = Gpcr::find($id);
        return Inertia::render('Gpcr/EditForm', ['gpcr' => $gpcr]);
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
        Gpcr::find($id)->update($request->all());

        // Redirect the user to the index page after the update
        return redirect()->route('pcr.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gpcr $pcr)
    {
        Gpcr::find($pcr->id)->delete();
        return redirect()->route('pcr.index');
    }


    public function moneyReceipt($id)
    {
        $data = Gpcr::find($id);

        return Inertia::render('Gpcr/MoneyReceipt', ['data' => $data]);
    }

    public function summaryReport(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Gpcr::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Gpcr/Reports/DateWiseBalanceSummary', [
            'data' => $data
        ]);
    }



}
