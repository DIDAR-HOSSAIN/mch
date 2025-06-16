<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antigen extends Model
{
    use HasFactory;

     protected $fillable = [
        'patient_id',
        'name',
        'email',
        'sex',
        'address',
        'test_name',
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
        'entry_date',
        'contact_no_relation',
        'sample_collected_by',
        'hospital_name',
        'dob',
        'age',
        'payment_type',
        'account_head',
        'nid',
        'user_name',
    ];
}
