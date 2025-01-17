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
        Schema::create('molecular_reg_tests', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id', 20)->nullable();
            $table->unsignedBigInteger('test_id')->nullable();
            $table->date('test_date')->useCurrent();
            $table->string('test_name');
            $table->float('test_fee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_reg_tests');
    }
};
