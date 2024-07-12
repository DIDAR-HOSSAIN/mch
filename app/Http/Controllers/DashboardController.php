<?php

namespace App\Http\Controllers;

use App\Models\Dope;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allIncomeExpenses = Dope::all();
        $totalUsers = User::count(); // Use count() to get the total number of users

        // Calculate totals
        $totalPaid = $allIncomeExpenses->sum('paid'); // Assuming 'paid' is the field for paid amounts
        $totalDue = $allIncomeExpenses->sum('due'); // Assuming 'due' is the field for due amounts
        $totalDiscount = $allIncomeExpenses->sum('discount'); // Assuming 'discount' is the field for discount amounts

        return Inertia::render('Dashboard', [
            'totalPaid' => $totalPaid,
            'totalDue' => $totalDue,
            'totalDiscount' => $totalDiscount,
            'totalUsers' => $totalUsers, // Add totalUsers to the data passed to the view
        ]);
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
