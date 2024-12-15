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

    public function molecularReg()
{
    return $this->belongsTo(molecularReg::class);
}

public function molecularTest()
{
    return $this->belongsTo(MolecularTest::class);
}

public function sample()
    {
        return $this->belongsTo(Sample::class, 'sample_id');
    }

    public function molecularResult()
    {
        return $this->hasMany(MolecularResult::class, 'sample_id');
    }

    
    

}
