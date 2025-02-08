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
        Schema::create('molecular_results', function (Blueprint $table) {
            $table->id();
            $table->string('result_id', 20)->unique();
            $table->string('sample_id', 20);
            $table->string('patient_id', 20);
            $table->unsignedBigInteger('test_id')->nullable();
            $table->enum('result_status', ['Negative', 'Positive']);
            $table->enum('specimen', ['Whole Blood', 'Plasma', 'Serum', 'Cervical Swab']);
            $table->string('investigation');
            $table->string('result')->nullable();
            $table->string('unit')->nullable();
            $table->string('result_copies')->nullable();
            $table->string('methodology')->nullable();
            $table->text('remarks')->nullable();
            $table->text('comments')->nullable();
            $table->enum('report_status', ['Pending', 'Ready', 'Delivered']);
            $table->dateTime('report_date');
            $table->string('user_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_results');
    }
};
