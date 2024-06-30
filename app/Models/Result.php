<?php

namespace App\Models;

use App\Models\SampleCollection;
use App\Models\Dope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = ['sample_id', 'patient_id', 'name', 'sample_collection_date', 'result_date', 'alcohol', 'benzodiazepines', 'cannabinoids', 'amphetamine', 'opiates', 'result_status', 'remarks', 'user_name'];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function sampleCollection()
    {
        return $this->belongsTo(SampleCollection::class);
    }

    public function dope()
    {
        return $this->belongsTo(Dope::class, 'patient_id', 'patient_id');
    }
}
