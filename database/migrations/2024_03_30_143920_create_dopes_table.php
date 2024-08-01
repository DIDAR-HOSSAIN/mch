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
            $table->date('brta_form_date')->default(now())->nullable(false);
            $table->string('brta_serial_no')->unique();
            $table->date('brta_serial_date')->default(now());
            $table->string('name')->nullable(false);
            $table->string('fathers_name')->nullable();
            $table->string('mothers_name')->nullable();
            $table->integer('nid')->unique()->nullable();
            $table->string('passport_no')->unique()->nullable();
            $table->string('contact_no')->nullable(false);
            $table->string('address')->nullable(false);
            $table->date('dob')->nullable(false);
            $table->integer('age')->default('0');
            $table->string('sex')->nullable(false);
            $table->date('entry_date')->default(now());
            $table->string('district')->nullable();
            $table->string('police_station')->nullable();
            $table->string('email')->nullable();
            $table->float('test_fee')->default('900');
            $table->float('reg_fee')->default('300');
            $table->float('online_fee')->default('300');
            $table->float('discount')->nullable();
            $table->float('paid')->default('0');
            $table->float('due')->default('0');
            $table->float('total')->nullable();
            $table->string('test_name')->default('Dope Test');
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
