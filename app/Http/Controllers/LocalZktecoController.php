<?php

namespace App\Http\Controllers;

use Rats\Zkteco\Lib\ZKTeco;

class LocalZktecoController extends Controller
{
    public function getAttendance()
    {
        $deviceIp = '192.168.1.40'; // ZKTeco Device IP
        $zk = new ZKTeco($deviceIp);

        if (!$zk->connect()) {
            return response()->json(['error' => 'Cannot connect to device'], 500);
        }

        $data = $zk->getAttendance();
        $zk->disconnect();

        return response()->json($data);
    }
}

