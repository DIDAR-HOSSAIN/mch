<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\AssignEmployeeRoster;
use App\Models\Employee;
use App\Models\Holiday;
use App\Models\Leave;
use App\Models\WeeklyHoliday;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use MehediJaman\LaravelZkteco\LaravelZkteco;


class AttendanceController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:attendance-list|attendance-create|attendance-edit|attendance-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:attendance-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:attendance-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:attendance-delete', ['only' => ['destroy']]);
        $this->middleware('permission:attendance-sync-create', ['only' => ['syncCreate', 'sync']]);
    }
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

        return Inertia::render('Payroll/AttendanceReport', [
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
        $employees = Employee::orderBy('name')->get();

        return Inertia::render('Payroll/ManualAttendance/ManualAttendance', [
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
            'date'        => 'required|date',
            'in_time'     => 'required|date_format:H:i',
            'out_time'    => 'required|date_format:H:i|after_or_equal:in_time',
        ]);

        $employeeId = $request->input('employee_id');
        $date       = $request->input('date');
        $inTime     = $request->input('in_time');
        $outTime    = $request->input('out_time');

        $dayOfWeek = date('l', strtotime($date));

        $assignedRoster = AssignEmployeeRoster::with('roster')
            ->where('employee_id', $employeeId)
            ->where('day_of_week', $dayOfWeek)
            ->first();

        $status = $inTime === $outTime ? 'Absent' : 'Present';

        Attendance::updateOrCreate(
            [
                'employee_id' => $employeeId,
                'date'        => $date,
            ],
            [
                'in_time' => $inTime,
                'out_time' => $outTime,
                'source' => 'manual',
                'status' => $status,
            ]
        );

        return redirect()->route('attendance.index')
            ->with('success', 'Manual attendance saved successfully with correct roster!');
    }

    public function getRoster($employee_id, $date)
    {
        $dayOfWeek = date('l', strtotime($date)); // Monday, Tuesday ...

        $assignedRoster = AssignEmployeeRoster::with('roster')
            ->where('employee_id', $employee_id)
            ->where('day_of_week', $dayOfWeek)
            ->first();

        if ($assignedRoster && $assignedRoster->roster) {
            return response()->json([
                'roster_name' => $assignedRoster->roster->roster_name,
                'start'       => $assignedRoster->roster->office_start,
                'end'         => $assignedRoster->roster->office_end,
            ]);
        }

        return response()->json(['message' => 'No roster assigned for this day.'], 404);
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
        return Inertia::render('Payroll/DataPull'); // à¦¤à§‹à¦®à¦¾à¦° React à¦ªà§‡à¦œ à¦…à¦¨à§à¦¯à¦¾à§Ÿà§€ à¦¨à¦¾à¦® à¦¦à¦¾à¦“
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
        $employees = Employee::with('assignEmployeeRoster.roster')->get();

        foreach ($employees as $employee) {

            $status = 'Absent';
            $remarks = '';

            // âœ… Holiday
            if (Holiday::whereDate('date', $todayDate)->exists()) {
                $status = 'Holiday';
                $remarks = 'Official Holiday';
            }

            // âœ… Leave
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

            // âœ… Weekly Off
            elseif (WeeklyHoliday::where('employee_id', $employee->id)
                ->where('day_of_week', $dayOfWeek)
                ->exists()
            ) {
                $status = 'Weekly Off';
                $remarks = 'Weekly Holiday';
            }

            // âœ… Today's roster
            $todayRoster = $employee->assignEmployeeRoster->firstWhere('day_of_week', $dayOfWeek);
            $rosterStart = $todayRoster ? Carbon::createFromFormat('H:i:s', $todayRoster->roster->office_start) : null;
            $rosterEnd   = $todayRoster ? Carbon::createFromFormat('H:i:s', $todayRoster->roster->office_end) : null;

            // âœ… Device records
            $deviceRecords = collect($data)
                ->where('id', (string) $employee->employee_id)
                ->filter(fn($rec) => date('Y-m-d', strtotime($rec['timestamp'])) == $todayDate->toDateString())
                ->sortBy('timestamp');

            $firstTime = $deviceRecords->isNotEmpty() ? Carbon::createFromFormat('H:i:s', date('H:i:s', strtotime($deviceRecords->first()['timestamp']))) : null;
            $lastTime  = $deviceRecords->isNotEmpty() ? Carbon::createFromFormat('H:i:s', date('H:i:s', strtotime($deviceRecords->last()['timestamp']))) : null;

            // âœ… Late / Early leave / Present
            if ($deviceRecords->isNotEmpty() && !in_array($status, ['Holiday', 'Leave', 'Weekly Off'])) {
                $status = 'Present';
                $remarks = '';

                if ($rosterStart && $rosterEnd) {
                    // Handle night shift
                    if ($rosterEnd->lt($rosterStart)) $rosterEnd->addDay();

                    // âœ… Grace time (e.g. 10 minutes)
                    $graceTime = $rosterStart->copy()->addMinutes(10);

                    if ($firstTime && $firstTime->gt($graceTime)) {
                        $status = 'Late';
                        $remarks = 'Arrived Late';
                    }

                    if ($lastTime && $lastTime->lt($rosterEnd)) {
                        $status = $status === 'Late' ? 'Late & Early Leave' : 'Early Leave';
                        $remarks = trim(($remarks ? $remarks . ', ' : '') . 'Left Early');
                    }

                    if ($firstTime && $lastTime && $firstTime->lte($graceTime) && $lastTime->gte($rosterEnd)) {
                        $status = 'Present';
                        $remarks = 'On Time';
                    }
                }
            }

            // âœ… Save Attendance
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

    


    // public function sync(Request $request)
    // {
    //     $deviceIp = '192.168.1.40';
    //     $zk = new LaravelZkteco($deviceIp);

    //     if (!$zk->connect()) {
    //         return back()->with('error', 'Unable to connect to attendance device.');
    //     }

    //     $data = $zk->getAttendance();
    //     if (empty($data)) {
    //         return back()->with('error', 'No attendance data found on device.');
    //     }

    //     // âœ… Filter only valid employee IDs
    //     $validEmployeeIds = Employee::pluck('employee_id')->map(fn($id) => (string)$id)->toArray();

    //     $filteredData = collect($data)->filter(function ($rec) use ($validEmployeeIds) {
    //         if (!isset($rec['id'], $rec['timestamp'])) return false;
    //         if (!in_array((string)$rec['id'], $validEmployeeIds)) return false;
    //         if (!strtotime($rec['timestamp'])) return false;
    //         return true;
    //     });

    //     // âœ… Group data by date
    //     $groupedData = $filteredData->groupBy(fn($rec) => date('Y-m-d', strtotime($rec['timestamp'])));

    //     $employees = Employee::with('assignEmployeeRoster.roster')->get();

    //     foreach ($groupedData as $date => $records) {
    //         $dayOfWeek = Carbon::parse($date)->format('l');

    //         foreach ($employees as $employee) {
    //             $status = 'Absent';
    //             $remarks = '';
    //             $firstTime = null;
    //             $lastTime = null;

    //             // âœ… holiday, leave, weekly off check
    //             if (Holiday::whereDate('date', $date)->exists()) {
    //                 $status = 'Holiday';
    //                 $remarks = 'Official Holiday';
    //             } elseif (
    //                 Leave::where('employee_id', $employee->id)
    //                 ->whereDate('start_date', '<=', $date)
    //                 ->whereDate('end_date', '>=', $date)
    //                 ->where('status', 'Approved')
    //                 ->exists()
    //             ) {
    //                 $status = 'Leave';
    //                 $remarks = 'On Leave';
    //             } elseif (
    //                 WeeklyHoliday::where('employee_id', $employee->id)
    //                 ->where('day_of_week', $dayOfWeek)
    //                 ->exists()
    //             ) {
    //                 $status = 'Weekly Off';
    //                 $remarks = 'Weekly Holiday';
    //             }

    //             // âœ… Find this employeeâ€™s device records for this date
    //             $deviceRecords = $records
    //                 ->where('id', (string)$employee->employee_id)
    //                 ->sortBy('timestamp');

    //             // à¦¯à¦¦à¦¿ à¦«à¦¿à¦™à§à¦—à¦¾à¦° à¦ªà¦¾à¦“à§Ÿà¦¾ à¦¯à¦¾à§Ÿ
    //             if ($deviceRecords->isNotEmpty()) {
    //                 $firstTime = Carbon::parse($deviceRecords->first()['timestamp'])->format('H:i:s');
    //                 $lastTime  = Carbon::parse($deviceRecords->last()['timestamp'])->format('H:i:s');

    //                 if (!in_array($status, ['Holiday', 'Leave', 'Weekly Off'])) {
    //                     $status = 'Present';
    //                     $remarks = 'On Time';

    //                     $todayRoster = $employee->assignEmployeeRoster->firstWhere('day_of_week', $dayOfWeek);
    //                     $rosterStart = $todayRoster ? Carbon::createFromFormat('H:i:s', $todayRoster->roster->office_start) : null;
    //                     $rosterEnd   = $todayRoster ? Carbon::createFromFormat('H:i:s', $todayRoster->roster->office_end) : null;

    //                     if ($rosterStart && $rosterEnd) {
    //                         if ($rosterEnd->lt($rosterStart)) $rosterEnd->addDay(); // night shift
    //                         $graceTime = $rosterStart->copy()->addMinutes(10);

    //                         if (Carbon::createFromFormat('H:i:s', $firstTime)->gt($graceTime)) {
    //                             $status = 'Late';
    //                             $remarks = 'Arrived Late';
    //                         }

    //                         if (Carbon::createFromFormat('H:i:s', $lastTime)->lt($rosterEnd)) {
    //                             $status = $status === 'Late' ? 'Late & Early Leave' : 'Early Leave';
    //                             $remarks = trim(($remarks ? $remarks . ', ' : '') . 'Left Early');
    //                         }
    //                     }
    //                 }
    //             }

    //             // âœ… Save attendance (à¦¸à¦¬ employee-à¦à¦° à¦œà¦¨à§à¦¯)
    //             Attendance::updateOrCreate(
    //                 ['employee_id' => $employee->id, 'date' => $date],
    //                 [
    //                     'in_time' => $firstTime,
    //                     'out_time' => $lastTime,
    //                     'device_user_id' => $employee->device_user_id,
    //                     'device_ip' => $deviceIp,
    //                     'source' => 'device',
    //                     'status' => $status,
    //                     'remarks' => $remarks,
    //                 ]
    //             );
    //         }
    //     }

    //     $zk->disconnect();

    //     return back()->with('success', 'âœ… All employees (with or without fingerprint) synced successfully!');
    // }


}
