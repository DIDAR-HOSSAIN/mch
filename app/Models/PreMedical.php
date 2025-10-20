<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreMedical extends Model
{
    use HasFactory;

    protected $fillable = [
        'pre_medical_id',
        'country_code',
        'entry_date',
        'passport_no',
        'passport_validity',
        'ten_years',
        'first_name',
        'last_name',
        'father_name',
        'mother_name',
        'date_of_issue',
        'place_of_issue',
        'date_of_birth',
        'sex',
        'nationality',
        'religion',
        'profession',
        'report_after_days',
        'report_date',
        'mobile_no',
        'serial_no',
        'country_name',
        'amount',
        'is_free',
        'discount',
        'gcc_slip_no',
        'gcc_slip_date',
        'expire_days',
        'photo',
        'user_name'
    ];

    protected $casts = [
        'ten_years' => 'boolean',
        'is_free' => 'boolean',
        'report_date' => 'date',
        'gcc_slip_date' => 'date',
    ];
}
