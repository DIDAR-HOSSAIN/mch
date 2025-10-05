<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeRoster extends Model
{
    use HasFactory;

    protected $fillable = ['employee_id', 'roster_id', 'day_of_week'];

    public function roster()
    {
        return $this->belongsTo(Roster::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
