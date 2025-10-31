<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('premedical_samples', function (Blueprint $table) {
            $table->id();
            $table->string('pre_medical_id')->nullable();
            $table->date('entry_date')->nullable();
            $table->string('passport_no')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('sex')->nullable();
            $table->string('serial_no')->nullable();
            $table->string('country_name')->nullable();
            $table->string('gcc_slip_no')->nullable();
            $table->string('photo')->nullable();
            $table->string('user_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('premedical_samples');
    }
};
