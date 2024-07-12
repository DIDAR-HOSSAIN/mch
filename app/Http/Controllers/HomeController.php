<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $patient_id = $request->input('patient_id');

        // Validate the input
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $searchResult = Result::with('dope')
        ->where('patient_id', $patient_id)
            ->get();

        if ($searchResult->isEmpty()) {
            return back()->withErrors(['patient_id' => 'Attestation not done'])->withInput();
        }

        // Check if any due field is greater than 0
        $hasDue = $searchResult->some(function ($result) {
            return $result->dope->due > 0; // assuming due is a field in the dope table
        });

        // dd($hasDue);

        if ($hasDue) {
            return back()->withErrors(['patient_id' => 'Attestation not done !!'])->withInput();
        }

        return Inertia::render('Home', ['results' => $searchResult]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
