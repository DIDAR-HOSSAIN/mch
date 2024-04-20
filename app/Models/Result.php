<?php

namespace App\Models;

use App\Models\SampleCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'result_id','sample_id', 'patient_id', 'name','result_date', 'alcohol', 'benzodiazepines', 'cannabinoids', 'amphetamine', 'opiates', 'status', 'remarks', 'user_name'
    ];

    public function sampleCollection()
    {
        return $this->belongsTo(SampleCollection::class);
    }
}
