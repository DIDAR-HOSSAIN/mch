<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PremedicalSample extends Model
{
    use HasFactory;

    protected $fillable = [
        'pre_medical_id',
        'collection_date',
        'barcode_no',
        'user_name',
    ];

    public function preMedical()
    {
        return $this->belongsTo(PreMedical::class);
    }
}
