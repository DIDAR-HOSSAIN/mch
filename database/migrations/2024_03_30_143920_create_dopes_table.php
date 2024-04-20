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
        Schema::create('dopes', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->unique();
            $table->date('brta_form_date')->default(now());
            $table->string('brta_serial_no')->unique();
            $table->date('brta_serial_date')->default(now());
            $table->string('name')->nullable(false);
            $table->string('fathers_name')->nullable(false);
            $table->string('mothers_name')->nullable(false);
            $table->string('nid')->unique();
            $table->string('passport_no')->unique();
            $table->string('contact_no')->nullable(false);
            $table->string('address')->nullable(false);
            $table->date('dob')->nullable(false);
            $table->string('age')->default('0');
            $table->string('sex')->nullable(false);
            $table->date('entry_date')->default(now());
            $table->date('sample_collection_date')->default(now());
            $table->string('police_station')->nullable();
            $table->string('district')->nullable();
            $table->string('email')->nullable();
            $table->string('reg_fee')->default('900');
            $table->string('discount')->nullable();
            $table->string('paid')->default('0');
            $table->string('due')->default('0');
            $table->string('total')->nullable(false);
            $table->string('test_name')->default('Dope Test');
            $table->string('sample_collected_by')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('payment_type')->default('Cash');
            $table->string('account_head')->default('Cash in hand');
            $table->string('user_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dopes');
    }
};
