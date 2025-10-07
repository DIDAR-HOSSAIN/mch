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
        Schema::create('assign_employee_rosters', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id');
            $table->unsignedBigInteger('roster_id');
            $table->string('day_of_week');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assign_employee_rosters');
    }
};
