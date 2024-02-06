<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gpcr extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'name',
        'email',
        'sex',
        'address',
        'test_type',
        'reg_fee',
        'date',
        'discount',
        'discount_reference',
        'total',
        'paid',
        'due',
        'contact_no',
        'police_station',
        'district',
        'passport_no',
        'vaccine_certificate_no',
        'vaccine_name',
        'first_dose_date',
        'second_dose_date',
        'booster_dose_date',
        'contact_no_relation',
        'sample_collected_by',
        'hospital_name',
        'dob',
        'age',
        'ticket_no',
        'payment_type',
        'account_head',
        'nid',
        'user_name',
    ];
}
