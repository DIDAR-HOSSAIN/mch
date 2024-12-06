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
        Schema::create('molecular_regs', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->unique();
            $table->string('name')->nullable(false);
            $table->string('contact_no')->nullable(false);
            $table->integer('age')->default(0);
            $table->string('gender')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_regs');
    }
};