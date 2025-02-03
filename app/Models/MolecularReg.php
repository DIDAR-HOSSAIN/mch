<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MolecularRegTest;

class MolecularReg extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'bill_no', 'name', 'contact_no', 'age', 'age_type', 'test_advised', 'gender', 'reg_date', 'discount', 'paid', 'due', 'total', 'net_payable', 'reference_name', 'remarks', 'payment_type', 'account_head', 'user_name'];


    public function molecularTests()
    {
        return $this->hasMany(MolecularRegTest::class, 'patient_id', 'patient_id');
    }    

}
