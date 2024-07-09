<?php

namespace App\Http\Controllers;

use App\Models\Reference;
use App\Http\Requests\StoreReferenceRequest;
use App\Http\Requests\UpdateReferenceRequest;
use Inertia\Inertia;

class ReferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $references = Reference::all();
        return Inertia::render('Reference/IndexReference', ['references' => $references]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reference/CreateReference');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReferenceRequest $request)
    {
        $request->validate([
            'reference_name' => 'required|string|max:255,unique:dopes',
        ]);

        Reference::create($request->all());

        return redirect()->route('references.index')->with('success', 'Reference created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reference $reference)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reference $reference)
    {
        return Inertia::render('Reference/EditReference', ['reference' => $reference]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReferenceRequest $request, Reference $reference)
    {
        $request->validate([
            'reference_name' => 'required|string|max:255',
        ]);

        $reference->update($request->all());

        return redirect()->route('references.index')->with('success', 'Reference updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reference $reference)
    {
        $reference->delete();

        return redirect()->route('references.index')->with('success', 'Reference deleted successfully.');
    }
}
