<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use App\Http\Requests\StoreLeaveRequest;
use App\Http\Requests\UpdateLeaveRequest;
use App\Models\Employee;
use Inertia\Inertia;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $leaves = Leave::with('student')->orderBy('start_date', 'desc')->paginate(10);
        // return inertia('Payroll/Leaves/ViewLeaves', compact('leaves'));

        $leaves = Leave::with('employee')->latest()->get();
        return Inertia::render('Payroll/Leaves/ViewLeaves', [
            'leaves' => $leaves
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employees = Employee::select('id', 'name')->get();
        return Inertia::render('Payroll/Leaves/CreateLeave', [
            'employees' => $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveRequest $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after_or_equal:start_date',
            'reason'      => 'nullable|string',
            'status'      => 'required|in:Approved,Pending,Rejected',
        ]);

        Leave::create([
            'employee_id' => $request->employee_id,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'reason'      => $request->reason,
            'status'      => $request->status,
        ]);

        return redirect()->route('leaves.index')->with('success', 'Leave added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Leave $leave)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leave $leave)
    {
        // dd($leave);

        return Inertia::render('Payroll/Leaves/EditLeave', [
            'leave' => $leave,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaveRequest $request, Leave $leave)
    {
        $request->validate([
            'leave_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
            'status' => 'required|string|in:Pending,Approved,Rejected',
        ]);

        $leave->update($request->all());

        return redirect()->route('leaves.index')->with('success', 'Leave updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leave $leave)
    {
        $leave->delete();
        return redirect()->back()->with('success', 'Leave deleted successfully.');
    }
}
