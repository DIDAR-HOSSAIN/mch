<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MolecularResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id',
        'patient_id',
        'test_id',
        'result_status',
        'investigation',
        'result',
        'unit',
        'result_copies',
        'methodology',
        'remarks',
        'comments',
        'user_name'

    ];

   
    public function molecularSample()
    {
        return $this->belongsTo(Sample::class, 'sample_id', 'sample_id');
    }

    public function molecularRegTest()
    {
        return $this->belongsTo(MolecularRegTest::class, 'test_id', 'test_id');
    }

}
