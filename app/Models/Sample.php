<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Sample extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id',
        'patient_id',
        'collection_date',
        'received_date',
        'received_by',
        'collection_status',
        'received_status',
        'remarks',
        'user_name'
    ];


    public function molecularPatientReg()
    {
        return $this->belongsTo(MolecularReg::class, 'patient_id', 'patient_id');
    }

    public function molecularResult(): HasOne
    {
        return $this->hasOne(MolecularResult::class, 'sample_id', 'sample_id');
    }

}
