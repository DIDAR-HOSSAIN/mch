<?php

namespace App\Http\Controllers;

use App\Models\EmployeeRoster;
use App\Http\Requests\StoreEmployeeRosterRequest;
use App\Http\Requests\UpdateEmployeeRosterRequest;
use App\Models\Employee;
use App\Models\Roster;
use App\Models\WeeklyHoliday;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class EmployeeRosterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Load employees with their roster assignments and roster details
        $employees = Employee::with(['rosters.roster'])
            ->orderBy('name')
            ->get();

        $rosters = Roster::orderBy('roster_name')->get();
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return Inertia::render('Payroll/Roster-Assign/ViewRosterAssign', [
            'employees' => $employees,
            'rosters'   => $rosters,
            'days'      => $days,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employees = Employee::orderBy('name')->get();
        $rosters   = Roster::orderBy('roster_name')->get();
        $days      = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return Inertia::render('Payroll/Roster-Assign/CreateRosterAssign', [
            'employees' => $employees,
            'rosters'   => $rosters,
            'days'      => $days,
            'editing'   => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRosterRequest $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|string',
            'assignments' => 'required|array',
        ]);

        $employeeId = $validated['employee_id'];
        $assignments = $validated['assignments'];

        // পুরনো ডেটা মুছে ফেলো
        EmployeeRoster::where('employee_id', $employeeId)->delete();
        WeeklyHoliday::where('employee_id', $employeeId)->delete();

        foreach ($assignments as $assign) {
            if (isset($assign['is_holiday']) && $assign['is_holiday'] === true) {
                // Weekly holiday table এ ইনসার্ট করো
                WeeklyHoliday::create([
                    'employee_id' => $employeeId,
                    'day_of_week' => $assign['day_of_week'],
                ]);
            } elseif (!empty($assign['roster_id'])) {
                // সাধারণ roster assign table এ ইনসার্ট করো
                EmployeeRoster::create([
                    'employee_id' => $employeeId,
                    'day_of_week' => $assign['day_of_week'],
                    'roster_id' => $assign['roster_id'],
                ]);
            }
        }

        return back()->with('success', 'Roster & Weekly Holidays saved successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeRoster $employeeRoster)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $rosters = Roster::all();
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        $assignments = EmployeeRoster::where('employee_id', $employee->id)->get();
        $holidays = WeeklyHoliday::where('employee_id', $employee->id)->get();
        dd([
            'rosters' => $rosters,
            'holidays' => $holidays,
            'assignments' => $assignments,
        ]);


        return Inertia::render('Payroll/Roster-Assign/EditRosterAssign', [
            'employee' => $employee,
            'rosters' => $rosters,
            'days' => $days,
            'assignments' => $assignments,
            'holidays' => $holidays,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRosterRequest $request, EmployeeRoster $employeeRoster)
    {
        $data = $request->validate([
            'assignments'        => ['required', 'array'],
            'assignments.*.day_of_week' => ['required', Rule::in(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])],
            'assignments.*.roster_id'   => ['required', 'exists:rosters,id'],
        ]);

        // Remove old assignments for this employee
        EmployeeRoster::where('employee_id', $employeeRoster)->delete();

        // Insert updated ones
        foreach ($data['assignments'] as $assign) {
            EmployeeRoster::create([
                'employee_id' => $employeeRoster,
                'roster_id'   => $assign['roster_id'],
                'day_of_week' => $assign['day_of_week'],
            ]);
        }

        return redirect()->route('employee-rosters.index')->with('success', 'Roster assignments updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeRoster $employeeRoster)
    {
        $er = EmployeeRoster::findOrFail($employeeRoster);
        $er->delete();
        return back()->with('success', 'Assignment removed.');
    }
}
