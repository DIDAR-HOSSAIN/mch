<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalTest extends Model
{
    use HasFactory;

    protected $fillable = ['test_name', 'fee'];

    public function repeatTestItems()
    {
        return $this->hasMany(RepeatTestItem::class);
    }
}
