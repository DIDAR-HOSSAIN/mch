<?php

namespace App\Http\Controllers;

use App\Models\MolecularResult;
use App\Http\Requests\StoreMolecularResultRequest;
use App\Http\Requests\UpdateMolecularResultRequest;

class MolecularResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Molecular/ViewMolecularResult', ['tests' => $tests, 'references' => $references]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Molecular/CreateMolecularResult', ['tests' => $tests, 'references' => $references]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMolecularResultRequest $request)
    {
        $validated = $request->validate([
            'sample_id' => 'required|exists:samples,id',
            'investigation' => 'required',
            'result' => 'required',
            'unit' => 'nullable',
            'methodology' => 'nullable',
            'remarks' => 'nullable',
            'comments' => 'nullable',
        ]);
    
        $result = MolecularResult::create($validated);
    
        return response()->json(['message' => 'Result added successfully', 'result' => $result]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MolecularResult $molecularResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MolecularResult $molecularResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMolecularResultRequest $request, MolecularResult $molecularResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MolecularResult $molecularResult)
    {
        //
    }
}
