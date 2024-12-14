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
            $table->unsignedBigInteger('sample_id');
            $table->string('investigation'); // Test name, e.g., 'Hepatitis B Virus (HBV)'
            $table->string('result')->nullable(); // e.g., 'Positive', 'Negative'
            $table->string('unit')->nullable(); // e.g., 'copies/mL'
            $table->string('methodology')->nullable(); // e.g., 'PCR'
            $table->text('remarks')->nullable();
            $table->text('comments')->nullable();
            $table->string('user_name')->nullable(); // e.g., 'copies/mL'
            $table->timestamps();
            // Foreign key to Sample table
            $table->foreign('sample_id')->references('id')->on('samples')->onDelete('cascade');
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
