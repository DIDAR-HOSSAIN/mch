<?php

namespace App\Http\Controllers;

use App\Models\Antigen;
use App\Http\Requests\StoreAntigenRequest;
use App\Http\Requests\UpdateAntigenRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\District;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AntigenController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:antigen-list|antigen-create|antigen-edit|antigen-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:antigen-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:antigen-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:antigen-delete', ['only' => ['destroy']]);
        $this->middleware('permission:antigen-summary-report', ['only' => ['dateWiseBalSummary']]);
        $this->middleware('permission:antigen-summary-details', ['only' => ['summaryDetails']]);
        $this->middleware('permission:antigen-due-check', ['only' => ['duesCheck']]);
        $this->middleware('permission:antigen-money-receipt', ['only' => ['antigenMoneyReceipt']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Antigen::query();

        if ($startDate && $endDate) {
            // Make sure to convert the string dates to DateTime objects
            $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $datas = $query->orderBy('id', 'desc')->latest()->get();

        return Inertia::render('Antigen/ViewList', ['datas' => $datas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       $districts = District::with('thanas')->get();

        return Inertia::render('Antigen/CreateForm', ['districts' => $districts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAntigenRequest $request)
    {
        
        // Retrieve all data from the request
        $data = $request->all();

        // Generate patient_id
        $data['patient_id'] = $this->generatePatientId();

        // Check if there is an authenticated user
        if ($user = Auth::user()) {
            $data['user_name'] = $user->name;
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }        

        $data['dob'] = $data['dob'] ?? now()->toDateString();

        // Set entry_date to current date if not provided
        $data['entry_date'] = $data['entry_date'] ?? now()->toDateString();

        // Create Gpcr record
        $antigen = Antigen::create($data);

        // Redirect to the money invoice route with the ID
        return redirect()->route('antigen.invoice', ['id' => $antigen->id])->with('success', 'Antigen Added successfully.');
      
        
    }


    private function generatePatientId()
    {
        $prefix = 'MCHA';
        $currentDate = now()->format('ymd');

        // Loop until a unique patient_id is generated
        do {
            // Get the maximum patient_id for the current date
            $latestPatientId = DB::table('antigens')
                ->where('patient_id', 'like', "MCH-$currentDate-%")
                ->max('patient_id');

            // If there are existing records for the current date, extract the serial number and increment
            $serialNumber = $latestPatientId ? intval(substr($latestPatientId, -3)) + 1 : 1;

            // Format the serial number with leading zeros
            $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);

            // Generate the new patient_id
            $newPatientId = $prefix . '-' . $currentDate . '-' . $serialNumberFormatted;
        } while (Antigen::where('patient_id', $newPatientId)->exists());

        return $newPatientId;
    }

    /**
     * Display the specified resource.
     */
    public function show(Antigen $antigen)
    {
        //  $gpcr = Gpcr::find($id);
        return Inertia::render('Antigen/ShowDetails', ['antigen' => $antigen]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Antigen $antigen)
    {
        // $antigen = Antigen::find($id);
        return Inertia::render('Antigen/EditForm', ['antigen' => $antigen]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAntigenRequest $request, Antigen $antigen)
    {
         // Validator::make($request->all(), [
        //     'title' => ['required'],
        //     'body' => ['required'],
        // ])->validate();

     // Convert date fields to date string if present
    $dateFields = ['dob', 'entry_date'];
    foreach ($dateFields as $field) {
        if ($request->has($field)) {
            $request->merge([$field => Carbon::parse($request->input($field))->toDateString()]);
        }
    }

    // Ensure 'due' is not null
    $data = $request->all();
    $data['due'] = $data['due'] ?? 0; // default to 0 if null

    $antigen->update($data);

    return redirect()->route('antigen.index')->with('success', 'Antigen record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Antigen $antigen)
    {
         Antigen::find($antigen->id)->delete();
        return redirect()->route('antigen.index');
    }

    public function antigenMoneyReceipt($id)
    {
        $data = Antigen::find($id);

        return Inertia::render('Antigen/MoneyReceipt', ['data' => $data]);
    }



    public function dateWiseBalSummary(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Antigen::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Antigen/Reports/DateWiseBalanceSummary', [
            'data' => $data
        ]);
    }

    public function summaryDetails(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Antigen::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Antigen/Reports/DateWiseBalanceSummaryDetails', [
            'data' => $data
        ]);
    }

    public function duesCheck(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Antigen::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Antigen/Reports/DuesReport', [
            'data' => $data
        ]);
    }
}
