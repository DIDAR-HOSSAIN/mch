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
        Schema::create('repeat_test_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('repeat_test_id')->nullable();
            $table->unsignedBigInteger('medical_test_id')->nullable();
            $table->decimal('amount', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repeat_test_items');
    }
};
