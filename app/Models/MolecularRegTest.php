<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\molecularReg;
use App\Models\MolecularTest;

class MolecularRegTest extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'test_id', 'entry_date', 'discount', 'paid', 'due', 'total', 'user_name'];

    public function molecularReg()
{
    return $this->belongsTo(molecularReg::class);
}

public function molecularTest()
{
    return $this->belongsTo(MolecularTest::class);
}

    
    

}
