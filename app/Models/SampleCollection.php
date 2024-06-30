<?php

namespace App\Models;

use App\Models\Result;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleCollection extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'name', 'sample_collection_date', 'sample_status', 'remarks', 'user_name'];

    public function result()
    {
        return $this->hasOne(Result::class);
    }
}
