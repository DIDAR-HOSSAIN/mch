<?php

namespace App\Http\Controllers;

use App\Models\Dope;
use App\Models\Result;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $patient_id = $request->input('patient_id');

        // Query results with related dope information
        $searchResult = Result::with('dope')
        ->where('patient_id', $patient_id)
        ->get();

        // Return the search results
        // return response()->json(['results' => $searchResult]);
        return Inertia::render('Home', ['results' => $searchResult]);

        // dd($searchResult);
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
