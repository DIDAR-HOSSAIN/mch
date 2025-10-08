<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'employee_id', 'device_user_id', 'roster_id'];

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
