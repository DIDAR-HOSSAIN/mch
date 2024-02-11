<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
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
            $table->string('patient_id')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->date('dob')->default(now());
            $table->string('age')->default('0');
            $table->string('sex');
            $table->string('address');
            $table->string('contact_no');
            $table->string('passport_no')->nullable();
            $table->string('police_station')->nullable();
            $table->string('district')->nullable();
            $table->string('reg_fee')->default('3500');
            $table->string('discount')->nullable();
            $table->string('paid')->default('0');
            $table->string('due')->default('0');
            $table->string('total');
            $table->string('discount_reference')->nullable();
            $table->string('vaccine_name')->nullable();
            $table->string('vaccine_certificate_no')->nullable();
            $table->date('first_dose_date')->nullable();
            $table->date('second_dose_date')->nullable();
            $table->date('booster_dose_date')->nullable();
            $table->string('contact_no_relation')->nullable();
            $table->string('test_type')->default('General PCR');
            $table->date('entry_date')->default(Carbon::now());
            $table->string('sample_collected_by')->nullable();
            $table->string('hospital_name')->nullable();
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
