<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use Carbon\Carbon;
use Inertia\Inertia;
use MehediJaman\LaravelZkteco\LaravelZkteco;

class AttendanceLogController extends Controller
{
    // React পেজ
    public function syncCreate()
    {
        return Inertia::render('Payroll/Logs/LogList');
    }

    // F35 Device Sync
    public function syncF35()
    {
        $deviceIp = '192.168.1.40';
        $zk = new LaravelZkteco($deviceIp);

        try {
            if (!$zk->connect()) {
                return back()->with('error', 'Unable to connect to F35 device.');
            }

            $data = $zk->getAttendance();

            if (empty($data)) {
                return back()->with('error', 'No attendance data found on F35 device.');
            }

            // Attendance Save
            $this->saveAttendance($data, $deviceIp);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        } finally {
            $zk->disconnect();
        }

        return back()->with('success', 'Attendance synced successfully from F35 device.');
    }

    private function saveAttendance($data, $deviceIp)
    {
        $today = Carbon::today();

        $employees = Employee::all();

        foreach ($employees as $employee) {
            $records = collect($data)
                ->where('id', (string)$employee->employee_id)
                ->filter(fn($rec) => date('Y-m-d', strtotime($rec['timestamp'])) == $today->toDateString())
                ->sortBy('timestamp');

            $firstTime = $records->isNotEmpty()
                ? Carbon::parse($records->first()['timestamp'])->format('H:i:s')
                : null;

            $lastTime = $records->isNotEmpty()
                ? Carbon::parse($records->last()['timestamp'])->format('H:i:s')
                : null;

            Attendance::updateOrCreate(
                ['employee_id' => $employee->id, 'date' => $today->toDateString()],
                [
                    'in_time' => $firstTime,
                    'out_time' => $lastTime,
                    'device_user_id' => $employee->device_user_id,
                    'device_ip' => $deviceIp,
                    'source' => 'F35',
                ]
            );
        }
    }
}
