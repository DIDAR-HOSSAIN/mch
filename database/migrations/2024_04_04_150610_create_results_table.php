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
            $table->date('result_date');
            $table->boolean('alcohol')->default(1);
            $table->boolean('benzodiazepines')->default(1);
            $table->boolean('cannabinoids')->default(1);
            $table->boolean('amphetamine')->default(1);
            $table->boolean('opiates')->default(1);
            $table->boolean('status')->default(0);
            $table->string('remarks')->nullable();
            $table->string('user_name');
            $table->timestamps();
            $table->foreign('sample_id')->references('id')->on('sample_collections')->onDelete('cascade');
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
