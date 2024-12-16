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
        'collection_status',
        'received_status',
        'remarks',
        'user_name'
    ];

    // Relationship to Patient
    public function molecularPatientReg()
    {
        return $this->belongsTo(MolecularReg::class, 'patient_id', 'patient_id');
    }
    
    public function molecularResults()
    {
        return $this->hasMany(MolecularResult::class, 'sample_id', 'sample_id');
    }


}
