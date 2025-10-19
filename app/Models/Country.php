<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'country_code'];

    // Relation to PreMedical
    public function preMedicals()
    {
        return $this->hasMany(PreMedical::class);
    }
}
