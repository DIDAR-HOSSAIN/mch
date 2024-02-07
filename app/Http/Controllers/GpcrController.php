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

        // Ensure 'date' is present in the $data array
        if (!isset($data['date'])) {
            $data['date'] = now()->format('Y-m-d');
        } else {
            $data['date'] = Carbon::createFromFormat('d-m-Y', $data['date'])->format('Y-m-d');
        }

        // Generate patient_id
        $data['patient_id'] = $this->generatePatientId();

        $data['user_name'] = Auth::user()->name;

        // Create Gpcr record
        Gpcr::create($data);

        return response()->json(['message' => 'Data stored successfully'], 200);
    }



        private function generatePatientId()
        {
            // Your logic to generate patient_id goes here
            $prefix = 'MCH';
            $currentDate = now()->format('ymd');

            // Get the maximum patient_id for the current date
            $latestPatientId = DB::table('posts')
                ->where('patient_id', 'like', "MCH-$currentDate-%")
                ->max('patient_id');

            // If there are existing records for the current date, extract the serial number and increment
            $serialNumber = $latestPatientId ? intval(substr($latestPatientId, -3)) + 1 : 1;

            // Format the serial number with leading zeros
            $serialNumberFormatted = str_pad($serialNumber, 3, '0', STR_PAD_LEFT);

            return $prefix . '-' . $currentDate . '-' . $serialNumberFormatted;
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
