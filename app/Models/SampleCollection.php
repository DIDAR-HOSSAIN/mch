<?php

namespace App\Models;

use App\Models\Result;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'sample_id', 'patient_id', 'name','sample_collection_date', 'status', 'remarks','user_name'
    ];

    public static function boot()
    {
        parent::boot();

        static::created(function ($sampleCollection) {
            // Create a corresponding Result record
            $sampleCollection->result()->create([
                'sample_id' => $sampleCollection->id,
                'patient_id' => $sampleCollection->patient_id,
                'name' => $sampleCollection->name,
                'result_date' => $sampleCollection->sample_collection_date, // Or whatever date you want for the result_date
                'alcohol' => 'Negative', // Default values for other fields
                'benzodiazepines' => 'Negative',
                'cannabinoids' => 'Negative',
                'amphetamine' => 'Negative',
                'opiates' => 'Negative',
                // Add default values for other fields as needed
            ]);
        });
    }

    public function result()
    {
        return $this->hasOne(Result::class);
    }
}
