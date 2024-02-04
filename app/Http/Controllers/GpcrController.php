<?php

namespace App\Http\Controllers;

use App\Models\Gpcr;
use App\Http\Requests\StoreGpcrRequest;
use App\Http\Requests\UpdateGpcrRequest;
use Inertia\Inertia;

class GpcrController extends Controller
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
        return Inertia::render('Gpcr/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGpcrRequest $request)
    {
        //
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
