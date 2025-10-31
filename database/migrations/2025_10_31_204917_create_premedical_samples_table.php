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
            $table->date('collection_date');
            $table->string('barcode_no')->unique();
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
