<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MolecularRegTest;

class MolecularReg extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'name', 'contact_no', 'age', 'gender'];

    public function molecularTests()
{
    return $this->hasMany(MolecularRegTest::class);
}
    

}
