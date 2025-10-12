<?php

/**
 * ZKTeco K50-A Raw Attendance Fetch Script (No Package)
 * Works via UDP/TCP socket
 */

$ip = '192.168.1.40';  // তোমার ডিভাইসের IP
$port = 4370;

$socket = @fsockopen($ip, $port, $errno, $errstr, 2);

if (!$socket) {
    die("❌ Connection failed: $errstr ($errno)");
}

echo "✅ Connected to device ($ip:$port)<br>";

// ZKTeco communication requires special binary packets.
// আমরা K50-A এর attendance log পড়তে raw command পাঠাবো।

// Function to send raw command
function zkSendCommand($socket, $command)
{
    fwrite($socket, $command);
    stream_set_timeout($socket, 3);
    return fread($socket, 1024);
}

// Send command to get attendance logs (Command 0x0200 + subcommand 0x0005)
$command = pack('H*', '50500000000000000000000000000000');
fwrite($socket, $command);
stream_set_timeout($socket, 2);
$response = fread($socket, 2048);

// ✅ এখানে response আসলে সেটি hex data (binary format)
if ($response) {
    echo "<br>📦 Raw Data Received (" . strlen($response) . " bytes)<br>";
    echo "<pre>";
    echo bin2hex($response); // হেক্স ফরম্যাটে দেখার জন্য
    echo "</pre>";
} else {
    echo "<br>⚠️ No data received (device may not support raw command)";
}

fclose($socket);
