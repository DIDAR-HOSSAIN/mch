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
        'investigation',
        'result',
        'unit',
        'methodology',
        'remarks',
        'comments',
        'user_name'

    ];

    // Relationship to Sample
    public function molecularSample()
    {
        return $this->belongsTo(Sample::class);
    }

    public function molecularRegTest()
    {
        return $this->belongsTo(MolecularRegTest::class, 'patient_id');
    }
}
