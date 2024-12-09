<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MolecularResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id',
        'investigation',
        'result',
        'unit',
        'methodology',
        'remarks',
        'comments',
    ];

    // Relationship to Sample
    public function sample()
    {
        return $this->belongsTo(Sample::class);
    }
}
