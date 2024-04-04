<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dope extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'brta_form_date',
        'brta_serial_no',
        'brta_serial_date',
        'name',
        'fathers_name',
        'mothers_name',
        'nid',
        'passport_no',
        'contact_no',
        'address',
        'dob',
        'age',
        'sex',
        'entry_date',
        'sample_collection_date',
        'police_station',
        'district',
        'email',
        'reg_fee',
        'discount',
        'paid',
        'due',
        'total',
        'test_name',
        'sample_collected_by',
        'reference_name',
        'payment_type',
        'account_head',
        'user_name',
    ];
}
