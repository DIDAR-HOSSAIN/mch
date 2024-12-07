<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMolecularRegTestRequest;
use App\Http\Requests\UpdateMolecularRegTestRequest;
use Inertia\Inertia;
use App\Models\MolecularReg;
use App\Models\MolecularRegTest;

class MolecularRegTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreMolecularRegTestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MolecularRegTest $molecularRegTest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MolecularRegTest $molecularRegTest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularRegTestRequest $request, MolecularRegTest $molecularRegTest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MolecularRegTest $molecularRegTest)
    {
        //
    }

    public function molecularMoneyReceipt($id)
    {
        // Fetch patient details
        $patient = MolecularReg::where('patient_id', $id)->firstOrFail();

        // Fetch associated test details
        $tests = MolecularRegTest::where('patient_id', $id)->get();

        // Combine data for receipt
        return Inertia::render ('Molecular/MoneyReceipt', compact('patient', 'tests'));
    }
}
