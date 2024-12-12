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
        Schema::create('samples', function (Blueprint $table) {
            $table->id();
            $table->string('sample_id')->unique();
            $table->string('patient_id');
            $table->string('name');
            $table->dateTime('collection_date');
            $table->dateTime('received_date')->nullable();
            $table->string('received_by')->nullable();
            $table->enum('collection_status', ['Pending', 'Collected', 'Failed'])->default('Collected');
            $table->enum('received_status', ['Pending', 'Received', 'Rejected'])->default('Pending');
            $table->string('remarks')->nullable();
            $table->string('user_name');
            $table->foreign('patient_id')->references('patient_id')->on('molecular_regs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('samples');
    }
};
