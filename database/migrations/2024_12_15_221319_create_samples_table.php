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
            $table->string('sample_id', 20)->unique();
            $table->string('patient_id', 20);
            $table->dateTime('collection_date');
            $table->dateTime('received_date')->nullable();
            $table->string('received_by')->nullable();
            $table->enum('collection_status', ['Pending', 'Collected', 'Failed']);
            $table->enum('received_status', ['Pending', 'Received', 'Rejected']);
            $table->string('remarks')->nullable();
            $table->enum('sample_status', ['Pending', 'Done']);
            $table->string('user_name');
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
