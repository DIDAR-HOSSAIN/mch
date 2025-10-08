<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'name',
        'father_name',
        'mother_name',
        'date_of_birth',
        'gender',
        'phone',
        'email',
        'address',
        'joining_date',
        'designation',
        'department',
        'roster_id',
        'employment_type',
        'basic_salary',
        'allowance',
        'deduction',
        'device_user_id',
        'is_active',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relation',
        'nid_number',
        'photo',
    ];

    public function assignEmployeeRoster()
    {
        return $this->hasMany(AssignEmployeeRoster::class, 'employee_id');
    }

    public function weeklyHolidays()
    {
        return $this->hasMany(WeeklyHoliday::class, 'employee_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    public function roster()
    {
        return $this->belongsTo(Roster::class);
    }
}
