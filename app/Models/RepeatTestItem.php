<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepeatTestItem extends Model
{
    use HasFactory;

    protected $fillable = ['repeat_test_id', 'medical_test_id', 'amount'];

    public function medicalTest()
    {
        return $this->belongsTo(MedicalTest::class);
    }
}
