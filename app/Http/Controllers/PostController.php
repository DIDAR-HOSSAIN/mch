<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class PostController extends Controller
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
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $data['patient_id'] = $this->generatePatientId();
        $data['name'] = $request->input('name');
        $data['description'] = $request->input('description');
        Post::create($data);

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
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
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
