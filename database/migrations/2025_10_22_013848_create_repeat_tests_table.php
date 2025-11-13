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
        Schema::create('repeat_tests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pre_medical_id')->nullable();
            $table->date('delivery_date')->nullable();
            $table->date('entry_date');
            $table->boolean('is_free')->default(false);
            $table->decimal('deduct', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->decimal('net_pay', 10, 2)->default(0);
            $table->string('serial_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repeat_tests');
    }
};
