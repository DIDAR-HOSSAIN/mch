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
            $table->unsignedBigInteger('sample_id')->unique();
            $table->string('patient_id')->unique();
            $table->string('name');
            $table->date('sample_collection_date');
            $table->date('result_date');
            $table->string('alcohol')->default('Negative');
            $table->string('benzodiazepines')->default('Negative');
            $table->string('cannabinoids')->default('Negative');
            $table->string('amphetamine')->default('Negative');
            $table->string('opiates')->default('Negative');
            $table->string('cocaine')->nullable();
            $table->string('methamphetamine')->nullable();
            $table->enum('result_status', ['Pending', 'Approve'])->default('Pending');
            $table->string('remarks')->nullable();
            $table->string('user_name');
            $table->timestamps();
            $table->foreign('sample_id')->references('id')->on('sample_collections')->onDelete('cascade');
            $table->foreign('patient_id')->references('patient_id')->on('dopes')->onDelete('cascade');
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
