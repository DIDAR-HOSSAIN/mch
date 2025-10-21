<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepeatTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'pre_medical_id',
        'delivery_date',
        'is_free',
        'deduct',
        'total',
        'net_pay',
        'serial_no'
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'delivery_date' => 'date',
    ];

    public function items()
    {
        return $this->hasMany(RepeatTestItem::class)->with('medicalTest');
    }

    public function preMedical()
    {
        return $this->belongsTo(PreMedical::class);
    }
    
}
