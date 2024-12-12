<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sample extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id',
        'patient_id',
        'name',
        'collection_date',
        'received_date',
        'received_by',
        'status',
        'remarks'
    ];

    // Relationship to Patient
    public function molecularPatientReg()
    {
        return $this->belongsTo(molecularReg::class);
    }

    // Relationship to Results
    public function molecularResults()
    {
        return $this->hasMany(Result::class);
    }
}
