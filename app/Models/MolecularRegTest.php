<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\molecularReg;
use App\Models\MolecularTest;
use App\Models\Sample;
use App\Models\MolecularResult;

class MolecularRegTest extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'test_id', 'entry_date', 'test_name', 'test_fee', 'test_date'];

    public function sample()
    {
        return $this->hasOne(Sample::class, 'patient_id', 'patient_id');
    }



    // public function molecularReg()
    // {
    //     return $this->belongsTo(molecularReg::class);
    // }

    // public function molecularTest()
    // {
    // return $this->belongsTo(MolecularTest::class);
    // }

    // public function molecularResults()
    // {
    //     return $this->hasMany(MolecularResult::class, 'test_id', 'test_id');
    // }

    
    

}
