<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Http\Requests\StoreDistrictRequest;
use App\Http\Requests\UpdateDistrictRequest;
use App\Models\Thana;

class DistrictController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:district-list|district-create|district-edit|district-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:district-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:district-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:district-delete', ['only' => ['destroy']]);
        $this->middleware('permission:district-get', ['only' => ['getByDistrict']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $districts = District::all();
        return response()->json($districts);
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
    public function store(StoreDistrictRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(District $district)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(District $district)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDistrictRequest $request, District $district)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(District $district)
    {
        //
    }

    public function getByDistrict($districtId)
    {
        $thanas = Thana::where('district_id', $districtId)->get();
        return response()->json($thanas);
    }

}
