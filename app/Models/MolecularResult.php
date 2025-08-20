<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MolecularResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'result_id',
        'sample_id',
        'sample_id',
        'patient_id',
        'test_id',
        'result_status',
        'specimen',
        'investigation',
        'pathogen_name_dengue',
        'pathogen_name_chikungunya',
        'result',
        'unit',
        'result_copies',
        'report_date',
        'methodology',
        'remarks',
        'comments',
        'user_name'

    ];

   
    public function molecularSample()
    {
        return $this->belongsTo(Sample::class, 'sample_id', 'sample_id');
    }

    public function molecularReg()
    {
        return $this->belongsTo(MolecularReg::class, 'patient_id', 'patient_id');
    }

    public function molecularRegTest()
    {
        return $this->belongsTo(MolecularRegTest::class, 'test_id', 'test_id');
    }

}
