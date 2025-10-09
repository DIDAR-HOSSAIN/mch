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
        Schema::create('pre_medicals', function (Blueprint $table) {
            $table->id();
            $table->string('short_code')->unique();
            $table->string('passport_no')->nullable();
            $table->boolean('ten_years')->default(false);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->date('date_of_issue')->nullable();
            $table->string('place_of_issue')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('sex', ['MALE', 'FEMALE', 'OTHER'])->default('MALE');
            $table->string('nationality')->default('BANGLADESHI');
            $table->string('religion')->nullable();
            $table->string('profession')->nullable();
            $table->date('report_date')->nullable();
            $table->integer('report_after_days')->nullable();
            $table->string('mobile_no')->nullable();
            $table->string('serial_no')->nullable();
            $table->string('country_name')->nullable();
            $table->decimal('amount', 10, 2)->default(0);
            $table->boolean('is_free')->default(false);
            $table->decimal('free_amount', 10, 2)->default(0);
            $table->string('gcc_slip_no')->nullable();
            $table->date('gcc_slip_date')->nullable();
            $table->integer('expire_days')->nullable();
            $table->string('photo')->nullable(); // store file path
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_medicals');
    }
};
