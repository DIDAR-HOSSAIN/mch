<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id', 'patient_id', 'name','sample_collection_date', 'status', 'remarks','user_name'
    ];
}
