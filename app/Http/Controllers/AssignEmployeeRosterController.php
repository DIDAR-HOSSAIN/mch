<?php

namespace App\Http\Controllers;

use App\Models\AssignEmployeeRoster;
use App\Http\Requests\StoreAssignEmployeeRosterRequest;
use App\Http\Requests\UpdateAssignEmployeeRosterRequest;
use App\Models\Employee;
use App\Models\Roster;
use App\Models\WeeklyHoliday;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class AssignEmployeeRosterController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:assign-employee-roster-list|assign-employee-roster-create|assign-employee-roster-edit|assign-employee-roster-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:assign-employee-roster-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:assign-employee-roster-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:assign-employee-roster-delete', ['only' => ['destroy']]);
        $this->middleware('permission:assign-employee-roster-summary-report', ['only' => ['summaryReport']]);
        $this->middleware('permission:assign-employee-roster-summary-details', ['only' => ['summaryDetails']]);
        $this->middleware('permission:assign-employee-roster-due-check', ['only' => ['duesCheck']]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with([
            'assignEmployeeRoster.roster',
            'weeklyHolidays'
        ])
            ->orderBy('name')
            ->get();

        $rosters = Roster::orderBy('roster_name')->get();
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return Inertia::render('Payroll/AssignEmployeeRoster/ViewRosterAssign', [
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
        // $rosters   = Roster::orderBy('roster_name')->get();
        $rosters = Roster::orderBy('office_start')->get();
        $days      = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return Inertia::render('Payroll/AssignEmployeeRoster/CreateRosterAssign', [
            'employees' => $employees,
            'rosters'   => $rosters,
            'days'      => $days,
            'editing'   => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignEmployeeRosterRequest $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|string',
            'assignments' => 'required|array',
        ]);

        $employeeId = $validated['employee_id'];
        $assignments = $validated['assignments'];

        // পুরনো ডেটা মুছে ফেলো
        AssignEmployeeRoster::where('employee_id', $employeeId)->delete();
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
                AssignEmployeeRoster::create([
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
    public function show(AssignEmployeeRoster $assignEmployeeRoster)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AssignEmployeeRoster $assignEmployeeRoster)
    {
        $employee = Employee::findOrFail($assignEmployeeRoster->employee_id);

        // $rosters = Roster::orderBy('roster_name')->get();
        $rosters = Roster::orderBy('office_start')->get();
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        $assignments = AssignEmployeeRoster::where('employee_id', $employee->id)->get();
        $holidays = WeeklyHoliday::where('employee_id', $employee->id)->get();

        return Inertia::render('Payroll/AssignEmployeeRoster/EditRosterAssign', [
            'employee'    => $employee,
            'rosters'     => $rosters,
            'days'        => $days,
            'assignments' => $assignments,
            'holidays'    => $holidays,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $employeeId)
    {
        $request->validate([
            'assignments' => ['required', 'array'],
            'assignments.*.day_of_week' => ['required', Rule::in([
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ])],
        ]);

        foreach ($request->assignments as $assign) {
            if (!empty($assign['is_holiday']) && $assign['is_holiday']) {
                WeeklyHoliday::updateOrCreate(
                    ['employee_id' => $employeeId, 'day_of_week' => $assign['day_of_week']],
                    []
                );

                AssignEmployeeRoster::where('employee_id', $employeeId)
                    ->where('day_of_week', $assign['day_of_week'])
                    ->delete();
            } elseif (!empty($assign['roster_id'])) {
                AssignEmployeeRoster::updateOrCreate(
                    ['employee_id' => $employeeId, 'day_of_week' => $assign['day_of_week']],
                    ['roster_id' => $assign['roster_id']]
                );

                WeeklyHoliday::where('employee_id', $employeeId)
                    ->where('day_of_week', $assign['day_of_week'])
                    ->delete();
            }
        }

        return redirect()->route('assign-employee-roster.index')
            ->with('success', 'Roster assignments updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AssignEmployeeRoster $assignEmployeeRoster)
    {
        //
    }
}
