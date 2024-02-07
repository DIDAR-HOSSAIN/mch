<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gpcrs', function (Blueprint $table) {
            $table->id();
            // $table->string('patient_id')
            $table->string('patient_id')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('sex');
            $table->string('address')->nullable();
            $table->string('test_type')->default('General PCR');
            $table->string('reg_fee')->default('3500');
            $table->date('date')->default(now());
            $table->string('discount')->nullable();
            $table->string('discount_reference')->nullable();
            $table->string('total');
            $table->string('paid');
            $table->string('due')->default('0');
            $table->string('contact_no');
            $table->string('police_station')->nullable();
            $table->string('district')->nullable();
            $table->string('passport_no')->nullable();
            $table->string('vaccine_certificate_no')->nullable();
            $table->string('vaccine_name')->nullable();
            $table->string('first_dose_date')->nullable();
            $table->string('second_dose_date')->nullable();
            $table->string('booster_dose_date')->nullable();
            $table->string('contact_no_relation')->nullable();
            $table->string('sample_collected_by')->nullable();
            $table->string('hospital_name')->nullable();
            $table->date('dob')->format('d/m/Y');
            $table->string('age')->default('0');
            $table->string('ticket_no')->nullable();
            $table->string('payment_type')->default('Cash');
            $table->string('account_head')->default('Cash in head');
            $table->string('nid')->nullable();
            $table->string('user_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gpcrs');
    }
};