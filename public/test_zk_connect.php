<?php
$ip = '192.168.1.40'; // তোমার ZKTeco ডিভাইসের IP
$port = 4370;

$socket = @fsockopen($ip, $port, $errno, $errstr, 2);

if (!$socket) {
    echo "❌ Connection failed: $errstr ($errno)\n";
} else {
    echo "✅ Connected to ZKTeco device ($ip:$port)\n";
    fclose($socket);
}
