<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Roster;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $employees = Employee::with('rosters')->latest()->get();
        $employees = Employee::with('roster')->latest()->get();
        return Inertia::render('Payroll/Employee/ViewEmployee', ['employees' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $rosters = Roster::select('id', 'roster_name')->get();
        return Inertia::render('Payroll/Employee/CreateEmployee', ['rosters' => $rosters]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'employee_id' => 'required|string|unique:employees,employee_id',
            'device_user_id' => 'required|string|unique:employees,device_user_id',
            'roster_id' => 'nullable|exists:rosters,id',
        ]);

        Employee::create($request->all());

        return redirect()->route('employees.index')->with('success', 'Employee created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $rosters = Roster::select('id', 'roster_name')->get();

        return Inertia::render('Payroll/Employee/EditEmployee', [
            'employee' => $employee,
            'rosters' => $rosters,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'employee_id' => 'required|string|unique:employees,employee_id,' . $employee->id,
            'device_user_id' => 'required|string|unique:employees,device_user_id,' . $employee->id,
            'roster_id' => 'nullable|exists:rosters,id',
        ]);

        $employee->update($request->all());

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return back()->with('success', 'Employee deleted successfully!');
    }
}
