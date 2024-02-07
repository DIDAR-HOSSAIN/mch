<?php

namespace App\Http\Controllers;

use App\Models\Gpcr;
use App\Http\Requests\StoreGpcrRequest;
use App\Http\Requests\UpdateGpcrRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GpcrController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Gpcr/ViewList');
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

        // Ensure 'date' is present in the $data array
        if (!isset($data['date'])) {
            $data['date'] = now()->format('Y-m-d');
        } else {
            $data['date'] = Carbon::createFromFormat('d-m-Y', $data['date'])->format('Y-m-d');
        }

        // Check if there is an authenticated user
        if ($user = Auth::user()) {
            // Access user properties safely
            $data['user_name'] = $user->name;
        } else {
            // Handle the case where there is no authenticated user
            // For example, you could set a default value or return an error response
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Create Gpcr record
        Gpcr::create($data);
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
    public function show(Gpcr $gpcr)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gpcr $gpcr)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGpcrRequest $request, Gpcr $gpcr)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gpcr $gpcr)
    {
        //
    }
}