<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sample;

class MolecularRegTest extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'test_id', 'entry_date', 'test_name', 'test_fee', 'test_date'];

    public function sample()
    {
        return $this->hasOne(Sample::class, 'patient_id', 'patient_id');
    }   
    

}
