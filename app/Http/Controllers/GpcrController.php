<?php

namespace App\Http\Controllers;
use App\Models\Gpcr;
use App\Http\Requests\StoreGpcrRequest;
use App\Http\Requests\UpdateGpcrRequest;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GpcrController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(HttpRequest $request)
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

        $datas = $query->get();

        return Inertia::render('Gpcr/ViewList', ['datas' => $datas]);

        // $datas = Gpcr::all();
        // return Inertia::render('Gpcr/ViewList', ['datas' => $datas]);
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

        // dd($gpcr); // Uncomment this line for debugging
        return Inertia::render('Gpcr/ShowDetails', ['gpcr' => $gpcr]);
    }


    /**
     * Show the form for editing the specified resource.
     */

    public function edit($id)
    {
        $gpcr = Gpcr::find($id);
        return Inertia::render('Gpcr/CreateForm', ['gpcr' => $gpcr]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGpcrRequest $request, Gpcr $gpcr)
    {
        try {
            $data = $request->all();
            $gpcr->update($data);
            return redirect()->route('pcr.index')->with('message', 'Data Updated Successfully');
        } catch (QueryException $e) {
            return redirect()->back()->withInput()->withErrors($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gpcr $gpcr)
    {
        //
    }


    public function moneyReceipt($id)
    {
        $data = Gpcr::find($id);

        return Inertia::render('Gpcr/MoneyReceipt', ['data' => $data]);
    }
    
}
