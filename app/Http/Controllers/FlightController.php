<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlightController extends Controller
{
    public function index()
    {
        // Display a listing of the resource
    }

    public function create()
    {
        return Inertia::render('Flight/CreateFlight');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'airline' => 'required|string|max:255',
            'status' => 'required|string|in:Scheduled,Delayed,Cancelled',
        ]);

        Flight::create([
            'name' => $request->name,
            'airline' => $request->airline,
            'status' => $request->status,
        ]);

        return redirect()->route('flights.index')->with('success', 'Flight created successfully.');
    }

}
