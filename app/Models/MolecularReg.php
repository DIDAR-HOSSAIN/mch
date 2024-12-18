<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MolecularRegTest;

class MolecularReg extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'name', 'contact_no', 'age', 'gender', 'reg_date', 'discount', 'paid', 'due', 'total', 'net_payable', 'reference_name', 'payment_type', 'account_head', 'user_name'];


    public function molecularTests()
    {
        return $this->hasMany(MolecularRegTest::class, 'patient_id', 'patient_id');
    }

    // public function molecularSamples()
    // {
    //     return $this->hasMany(Sample::class);
    // }
    

}
