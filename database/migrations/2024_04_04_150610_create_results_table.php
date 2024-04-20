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
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->string('result_id')->unique();
            $table->string('sample_id')->unique();
            $table->string('patient_id')->unique();
            $table->string('name');
            $table->date('result_date');
            $table->boolean('alcohol')->default('Negative');
            $table->boolean('benzodiazepines')->default('Negative');
            $table->boolean('cannabinoids')->default('Negative');
            $table->boolean('amphetamine')->default('Negative');
            $table->boolean('opiates')->default('Negative');
            $table->boolean('status')->nullable();
            $table->string('remarks')->nullable();
            $table->string('user_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
