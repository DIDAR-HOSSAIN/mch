<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sample extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'sample_code',
        'collection_date',
        'received_date',
        'collected_by',
        'received_by',
        'status',
        'condition',
        'remarks',
    ];

    // Relationship to Patient
    public function molecularPatientReg()
    {
        return $this->belongsTo(molecularReg::class);
    }

    // Relationship to Results
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
