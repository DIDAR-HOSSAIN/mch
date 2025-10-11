<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Rats\Zkteco\Lib\ZKTeco;
use App\Models\Attendance;

class SyncZktecoData extends Command
{
    protected $signature = 'zkteco:sync';
    protected $description = 'Sync ZKTeco attendance data to DB';

    public function handle()
    {
        $this->info('Connecting to ZKTeco device...');

        $zk = new ZKTeco('192.168.1.40');
        $zk->connect();
        $attendance = $zk->getAttendance();
        $zk->disconnect();

        foreach ($attendance as $record) {
            $date = date('Y-m-d', strtotime($record['timestamp']));
            $time = date('H:i:s', strtotime($record['timestamp']));

            if ($record['type'] == 0) {
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
            } else {
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

        $this->info("✅ Synced " . count($attendance) . " records successfully.");
    }
}
