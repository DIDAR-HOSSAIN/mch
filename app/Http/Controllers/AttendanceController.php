<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\Employee;
use App\Models\Holiday;
use App\Models\Leave;
use App\Models\Roster;
use App\Models\WeeklyHoliday;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use MehediJaman\LaravelZkteco\LaravelZkteco;


class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Attendance::with('employee');

        // 🔹 Date filter
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        } elseif ($request->filled('start_date')) {
            $query->whereDate('date', $request->start_date);
        }

        // 🔹 Employee filter
        if ($request->filled('employee_id') && $request->employee_id !== 'all') {
            $query->where('employee_id', $request->employee_id);
        }

        // 🔹 Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $attendances = $query->orderBy('date', 'desc')->get();

        $employees = Employee::select('id', 'name')->get();

        return Inertia::render('Payroll/PayrollReport', [
            'attendances' => $attendances ?? [],
            'employees' => $employees ?? [],
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'employee_id' => $request->employee_id ?? 'all',
                'status' => $request->status ?? 'all',
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employees = Employee::all();

        return Inertia::render('Payroll/ManualAttendance', [
            'employees' => $employees,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'in_time' => 'required|date_format:H:i',
            'out_time' => 'required|date_format:H:i|after_or_equal:in_time',
        ]);

        $status = $request->in_time === $request->out_time ? 'Absent' : 'Present';

        Attendance::updateOrCreate([
            'employee_id' => $request->employee_id,
            'date' => $request->date,
        ], [
            'in_time' => $request->in_time,
            'out_time' => $request->out_time,
            'source' => 'manual',
            'status' => $status,
        ]);

        return redirect()->route('attendance.index')->with('success', 'Manual attendance saved.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    
    public function syncCreate()
    {
        return Inertia::render('Payroll/DataPull'); // তোমার React পেজ অনুযায়ী নাম দাও
    }



    public function sync()
    {
        $deviceIp = '192.168.1.40';
        $zk = new LaravelZkteco($deviceIp);

        if (!$zk->connect()) {
            return back()->with('error', 'Unable to connect to attendance device.');
        }

        $data = $zk->getAttendance();
        if (empty($data)) {
            return back()->with('error', 'No attendance data found on device.');
        }

        $todayDate = Carbon::today();
        $dayOfWeek = $todayDate->format('l'); // Monday, Tuesday etc.
        $employees = Employee::with('rosters.roster')->get();

        foreach ($employees as $employee) {

            $status = 'Absent';
            $remarks = '';

            // ✅ Holiday
            if (Holiday::whereDate('date', $todayDate)->exists()) {
                $status = 'Holiday';
                $remarks = 'Official Holiday';
            }

            // ✅ Leave
            elseif (
                Leave::where('employee_id', $employee->id)
                ->whereDate('start_date', '<=', $todayDate)
                ->whereDate('end_date', '>=', $todayDate)
                ->where('status', 'Approved')
                ->exists()
            ) {
                $status = 'Leave';
                $remarks = 'On Leave';
            }

            // ✅ Weekly Off
            elseif (WeeklyHoliday::where('employee_id', $employee->id)
                ->where('day_of_week', $dayOfWeek)
                ->exists()
            ) {
                $status = 'Weekly Off';
                $remarks = 'Weekly Holiday';
            }

            // ✅ Today's roster
            $todayRoster = $employee->rosters->firstWhere('day_of_week', $dayOfWeek);
            $rosterStart = $todayRoster ? Carbon::createFromFormat('H:i:s', $todayRoster->roster->office_start) : null;
            $rosterEnd   = $todayRoster ? Carbon::createFromFormat('H:i:s', $todayRoster->roster->office_end) : null;

            // ✅ Device records
            $deviceRecords = collect($data)
                ->where('id', (string) $employee->employee_id)
                ->filter(fn($rec) => date('Y-m-d', strtotime($rec['timestamp'])) == $todayDate->toDateString())
                ->sortBy('timestamp');

            $firstTime = $deviceRecords->isNotEmpty() ? Carbon::createFromFormat('H:i:s', date('H:i:s', strtotime($deviceRecords->first()['timestamp']))) : null;
            $lastTime  = $deviceRecords->isNotEmpty() ? Carbon::createFromFormat('H:i:s', date('H:i:s', strtotime($deviceRecords->last()['timestamp']))) : null;

            // ✅ Late / Early leave / Present
            if ($deviceRecords->isNotEmpty() && !in_array($status, ['Holiday', 'Leave', 'Weekly Off'])) {
                $status = 'Present';
                $remarks = '';

                if ($rosterStart && $rosterEnd) {
                    // Handle night shift
                    if ($rosterEnd->lt($rosterStart)) $rosterEnd->addDay();

                    if ($firstTime && $firstTime->gt($rosterStart)) {
                        $status = 'Late';
                        $remarks = 'Arrived Late';
                    }
                    if ($lastTime && $lastTime->lt($rosterEnd)) {
                        $status = $status === 'Late' ? 'Late & Early Leave' : 'Early Leave';
                        $remarks = trim(($remarks ? $remarks . ', ' : '') . 'Left Early');
                    }
                    if ($firstTime && $lastTime && $firstTime->lte($rosterStart) && $lastTime->gte($rosterEnd)) {
                        $status = 'Present';
                        $remarks = 'On Time';
                    }
                }
            }

            // ✅ Save Attendance
            Attendance::updateOrCreate(
                ['employee_id' => $employee->id, 'date' => $todayDate->toDateString()],
                [
                    'in_time' => $firstTime?->format('H:i:s'),
                    'out_time' => $lastTime?->format('H:i:s'),
                    'device_user_id' => $employee->device_user_id,
                    'device_ip' => $deviceIp,
                    'source' => 'device',
                    'status' => $status,
                    'remarks' => $remarks,
                ]
            );
        }

        $zk->disconnect();
        return back()->with('success', 'Attendance synced successfully with multiple rosters!');
    }

}
