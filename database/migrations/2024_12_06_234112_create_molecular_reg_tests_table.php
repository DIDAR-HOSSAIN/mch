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
        Schema::create('molecular_reg_tests', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->unsignedBigInteger('test_id')->nullable();
            $table->date('entry_date')->useCurrent();
            $table->float('discount')->nullable();
            $table->float('paid')->default(0);
            $table->float('due')->default(0);
            $table->float('total')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('payment_type')->default('Cash');
            $table->string('account_head')->default('Cash in hand');
            $table->string('user_name');
            $table->foreign('patient_id')->references('patient_id')->on('molecular_regs')->onDelete('cascade');
            $table->foreign('test_id')->references('id')->on('molecular_tests')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_reg_tests');
    }
};
