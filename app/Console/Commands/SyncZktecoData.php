<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Rats\Zkteco\Lib\ZKTeco;
use Illuminate\Support\Facades\Http;

class SyncZKTecoData extends Command
{
    protected $signature = 'zkteco:sync';
    protected $description = 'Pull data from ZKTeco device and sync with hosting API';

    public function handle()
    {
        $zk_ip = env('ZKTECO_IP');
        $zk_port = env('ZKTECO_PORT', 4370);
        $hosting_url = env('HOSTING_SYNC_URL');

        $this->info("Connecting to ZKTeco device ($zk_ip:$zk_port)...");

        $zk = new ZKTeco($zk_ip, $zk_port);

        if (!$zk->connect()) {
            $this->error("❌ Cannot connect to ZKTeco device");
            return;
        }

        $attendance = $zk->getAttendance();
        $zk->disconnect();

        if (empty($attendance)) {
            $this->warn("⚠️ No attendance data found.");
            return;
        }

        $this->info("✅ Pulled " . count($attendance) . " records from device.");

        $records = [];
        foreach ($attendance as $log) {
            $records[] = [
                'id' => $log['uid'] ?? null,
                'timestamp' => $log['timestamp'] ?? null,
            ];
        }

        $response = Http::post($hosting_url, [
            'device_ip' => $zk_ip,
            'records' => $records,
        ]);

        if ($response->successful()) {
            $this->info("✅ Synced to hosting successfully!");
        } else {
            $this->error("❌ Failed to sync to hosting: " . $response->body());
        }
    }
}
