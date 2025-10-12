<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Rats\Zkteco\Lib\ZKTeco;
use Illuminate\Support\Facades\Http;

class ZktecoSync extends Command
{
    protected $signature = 'zkteco:sync';
    protected $description = 'Sync attendance data from local ZKTeco device to hosting server';

    public function handle()
    {
        $zk = new ZKTeco('192.168.1.40'); // তোমার ডিভাইসের IP
        $this->info("🔌 Connecting to ZKTeco device...");

        if ($zk->connect()) {
            $attendance = $zk->getAttendance();
            $zk->disconnect();

            if (empty($attendance)) {
                $this->warn("⚠️ No attendance data found.");
                return;
            }

            $this->info("📤 Sending " . count($attendance) . " records to hosting...");

            $response = Http::post(env('HOSTING_SYNC_URL'), [
                'records' => $attendance,
                'device_ip' => '192.168.1.40'
            ]);

            if ($response->successful()) {
                $this->info("✅ Hosting Response: " . $response->json()['message']);
            } else {
                $this->error("❌ Failed to send data. Response: " . $response->body());
            }
        } else {
            $this->error("❌ Cannot connect to ZKTeco device.");
        }
    }
}
