<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MolecularRegTest;

class MolecularTest extends Model
{
    use HasFactory;

    protected $fillable = ['test_name','test_fee'];


    // public function molecularRegTests()
    // {
    //     return $this->hasMany(molecularRegTest::class);
    // }


}
