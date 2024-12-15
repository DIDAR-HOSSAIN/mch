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
        Schema::create('molecular_results', function (Blueprint $table) {
            $table->id();
            $table->string('sample_id');
            $table->string('patient_id');
            $table->string('investigation'); // Test name, e.g., 'Hepatitis B Virus (HBV)'
            $table->string('result')->nullable(); // e.g., 'Positive', 'Negative'
            $table->string('unit')->nullable(); // e.g., 'copies/mL'
            $table->string('methodology')->nullable(); // e.g., 'PCR'
            $table->text('remarks')->nullable();
            $table->text('comments')->nullable();
            $table->string('user_name')->nullable(); // e.g., 'copies/mL'
            $table->timestamps();
            $table->foreign('sample_id')->references('sample_id')->on('samples')->onDelete('cascade');
            $table->foreign('patient_id')->references('patient_id')->on('molecular_reg_tests')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_results');
    }
};
