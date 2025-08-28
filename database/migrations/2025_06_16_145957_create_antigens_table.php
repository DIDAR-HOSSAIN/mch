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
        Schema::create('antigens', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id', 20)->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->date('dob')->nullable(false);
            $table->integer('age')->default(0);
            $table->string('sex');
            $table->string('address');
            $table->string('contact_no');
            $table->string('police_station')->nullable();
            $table->string('district')->nullable();
            $table->float('reg_fee')->default(3000);
            $table->float('discount')->nullable();
            $table->float('paid')->default(0);
            $table->float('due')->default(0);
            $table->float('total');
            $table->string('discount_reference')->nullable();
            $table->string('contact_no_relation')->nullable();
            $table->string('test_name')->default('Rapid Antigen');
            $table->date('entry_date');
            $table->string('sample_collected_by')->nullable();
            $table->string('hospital_name')->nullable();
            $table->string('payment_type')->default('Cash');
            $table->string('account_head')->default('Cash in hand');
            $table->integer('nid')->nullable();
            $table->string('user_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antigens');
    }
};
