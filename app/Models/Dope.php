<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Result;

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
        'police_station',
        'district',
        'email',
        'test_fee',
        'reg_fee',
        'online_fee',
        'discount',
        'paid',
        'due',
        'total',
        'reference_name',
        'test_name',
        'reference_name',
        'payment_type',
        'account_head',
        'user_name',
    ];

    public function report()
    {
        return $this->hasOne(Result::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
