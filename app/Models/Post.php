<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    function generatePatientId()
{
    $prefix = 'ABC'; // Replace with your desired prefix
    $date = now()->format('Ymd');
    $increment = str_pad(\DB::table('gpcrs')->max('id') + 1, 5, '0', STR_PAD_LEFT);

    return $prefix . $date . $increment;
}

    protected $fillable = [
        'name', 'description','patient_id'
    ];
}
