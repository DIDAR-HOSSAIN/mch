<?php

namespace App\Http\Controllers;

use Rats\Zkteco\Lib\ZKTeco;
use App\Models\Attendance;

class ZKTecoController extends Controller
{
    public function sync()
    {
        $zk = new ZKTeco('192.168.1.40');
        $zk->connect();

        $attendanceData = $zk->getAttendance();
        $zk->disconnect();

        foreach ($attendanceData as $record) {
            $date = date('Y-m-d', strtotime($record['timestamp']));
            $time = date('H:i:s', strtotime($record['timestamp']));

            if ($record['type'] == 0) { // check-in
                Attendance::updateOrCreate(
                    ['employee_id' => $record['id'], 'date' => $date],
                    [
                        'device_user_id' => $record['id'],
                        'in_time' => $time,
                        'device_ip' => '192.168.1.40',
                        'source' => 'ZKTeco',
                        'status' => 'present'
                    ]
                );
            } else { // check-out
                Attendance::updateOrCreate(
                    ['employee_id' => $record['id'], 'date' => $date],
                    [
                        'out_time' => $time,
                        'device_ip' => '192.168.1.40',
                        'source' => 'ZKTeco',
                        'status' => 'present'
                    ]
                );
            }
        }

        return response()->json([
            'success' => true,
            'count' => count($attendanceData)
        ]);
    }
}
