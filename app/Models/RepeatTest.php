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
        'entry_date',
        'is_free',
        'deduct',
        'total',
        'net_pay',
        'serial_no',
        'user_name',
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
