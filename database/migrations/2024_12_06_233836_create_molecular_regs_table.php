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
        Schema::create('molecular_regs', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id', 20)->unique();
            $table->string('bill_no', 25)->nullable();
            $table->string('name')->nullable(false);
            $table->string('contact_no')->nullable(false);
            $table->integer('age')->default(0);
            $table->string('gender')->nullable(false);
            $table->date('reg_date')->useCurrent();
            $table->float('discount')->nullable();
            $table->float('paid')->default(0);
            $table->float('due')->default(0);
            $table->float('total')->nullable();
            $table->float('net_payable')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('account_head')->nullable();
            $table->string('user_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_regs');
    }
};
