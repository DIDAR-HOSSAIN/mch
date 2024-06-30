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
        Schema::create('sample_collections', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('patient_id')->unique();
            $table->string('name');
            $table->date('sample_collection_date');
            $table->string('sample_status');
            $table->string('remarks')->nullable();
            $table->string('user_name');
            $table->foreign('patient_id')->references('patient_id')->on('dopes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sample_collections');
    }
};
