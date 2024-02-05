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
            $table->char('patient_id', 10)->unique();
            $table->string('name');
            $table->string('sex');
            $table->string('address');
            $table->string('test_type');
            $table->string('reg_fee');
            $table->date('date');
            $table->string('user_name');
            $table->string('total');
            $table->string('discount');
            $table->string('discount_reference');
            $table->string('paid');
            $table->string('contact_no');
            $table->string('police_station');
            $table->string('district');
            $table->string('passport_no');
            $table->string('vaccine_certificate_no');
            $table->string('vaccine_name');
            $table->string('first_dose_date');
            $table->string('second_dose_date');
            $table->string('booster_dose_date');
            $table->string('contact_no_relation');
            $table->string('sample_collected_by');
            $table->string('hospital_name');
            $table->string('dob');
            $table->string('age');
            $table->string('ticket_no');
            $table->string('payment_type');
            $table->string('account_head');
            $table->string('nid');
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
