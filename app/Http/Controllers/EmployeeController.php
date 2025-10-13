<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Roster;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $employees = Employee::with('roster')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('employee_id', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->appends(['search' => $search]);

        return Inertia::render('Payroll/Employee/ViewEmployee', [
            'employees' => $employees,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $rosters = Roster::select('id', 'roster_name')->get();
        return Inertia::render('Payroll/Employee/CreateEmployee', ['rosters' => $rosters, 'message' => session('message')]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'employee_id' => 'required|string|max:50|unique:employees',
                'device_user_id' => 'required|string|max:50',
                'roster_id' => 'required|exists:rosters,id',
                'designation' => 'required|string|max:100',
                'department' => 'nullable|string|max:100',
                'joining_date' => 'required|date',
                'salary' => 'nullable|numeric|min:0',
                'phone' => 'required|string|max:20',
                'email' => 'nullable|email|max:255',
                'address' => 'nullable|string',
                'nid_no' => 'nullable|string|max:50',
                'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            if ($validator->fails()) {
                return redirect()->back()
                    ->withErrors($validator) // Pass validation errors
                    ->withInput(); // Keep old input values
            }

            $validated = $validator->validated();

            // Handle file upload
            if ($request->hasFile('photo')) {
                $validator['photo'] = $request->file('photo')->store('employees', 'public');
            }



            // ✅ Step 4: Create employee record
            Employee::create($validated);

            // ✅ Step 5: Redirect with success
            return redirect()
                ->route('employees.create')
                ->with('message', 'Employee added successfully!');
        } catch (Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed: ' . $e->getMessage()])
                ->withInput();
        }
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
        return Inertia::render('Payroll/Employee/EditEmployee', [
            'employee' => $employee,
            'rosters' => Roster::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'employee_id' => 'required|string|max:50|unique:employees,employee_id,' . $employee->id,
            'device_user_id' => 'required|string|max:50',
            'roster_id' => 'required|exists:rosters,id',
            'designation' => 'required|string|max:100',
            'department' => 'nullable|string|max:100',
            'joining_date' => 'required|date',
            'salary' => 'nullable|numeric|min:0',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'nid_no' => 'nullable|string|max:50',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($employee->photo && Storage::disk('public')->exists($employee->photo)) {
                Storage::disk('public')->delete($employee->photo);
            }
            $validated['photo'] = $request->file('photo')->store('employees', 'public');
        }

        $employee->update($validated);

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        try {
            if ($employee->photo && Storage::disk('public')->exists($employee->photo)) {
                Storage::disk('public')->delete($employee->photo);
            }

            $employee->delete();

            return back()->with('success', 'Employee deleted successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Error deleting employee: ' . $e->getMessage());
        }
    }
}
