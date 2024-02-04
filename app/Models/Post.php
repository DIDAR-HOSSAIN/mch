<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $primaryKey = 'number_component'; // Use the auto-incrementing number component as the primary key
    public $incrementing = false; // Disable Laravel's default auto-incrementing behavior
    protected $keyType = 'string'; // Set the key type to string if needed

    protected $fillable = [
        'name', 'description'
    ];
}
