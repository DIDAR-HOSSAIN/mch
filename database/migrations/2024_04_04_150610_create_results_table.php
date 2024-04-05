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
            $table->boolean('alcohol');
            $table->boolean('benzodiazepines');
            $table->boolean('cannabinoids');
            $table->boolean('amphetamine');
            $table->boolean('opiates');
            $table->boolean('status');
            $table->string('remarks');
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
