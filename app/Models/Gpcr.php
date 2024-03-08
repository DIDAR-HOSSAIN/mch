<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Gpcr extends Model
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
        'passport_no',
        'vaccine_certificate_no',
        'vaccine_name',
        'entry_date',
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->entry_date = $model->entry_date ?? Carbon::now()->toDateString();
        });
    }
}
