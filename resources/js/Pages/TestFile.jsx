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
            $table->string('patient_id')->unique();
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
        Schema::create('molecular_tests', function (Blueprint $table) {
            $table->id();
            $table->string('test_name');
            $table->float('test_fee')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecular_tests');
    }
};


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
            $table->date('test_date')->useCurrent();
            $table->string('test_name');
            $table->float('test_fee');
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
        Schema::create('samples', function (Blueprint $table) {
            $table->id();
            $table->string('sample_id')->unique();
            $table->string('patient_id');
            $table->string('name');
            $table->dateTime('collection_date');
            $table->dateTime('received_date')->nullable();
            $table->string('received_by')->nullable();
            $table->enum('collection_status', ['Pending', 'Collected', 'Failed'])->default('Collected');
            $table->enum('received_status', ['Pending', 'Received', 'Rejected'])->default('Pending');
            $table->string('remarks')->nullable();
            $table->string('user_name');
            $table->foreign('patient_id')->references('patient_id')->on('molecular_regs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('samples');
    }
};


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
        $table->string('sample_id');
        $table->string('patient_id');
        $table->unsignedBigInteger('test_id')->nullable(); // Add this for test-specific results
        $table->string('investigation'); // Test name, e.g., 'Hepatitis B Virus (HBV)'
        $table->string('result')->nullable(); // e.g., 'Positive', 'Negative'
        $table->string('unit')->nullable(); // e.g., 'copies/mL'
        $table->string('methodology')->nullable(); // e.g., 'PCR'
        $table->text('remarks')->nullable();
        $table->text('comments')->nullable();
        $table->string('user_name')->nullable();
        $table->timestamps();

        // Foreign key constraints
        $table->foreign('sample_id')->references('sample_id')->on('samples')->onDelete('cascade');
        $table->foreign('patient_id')->references('patient_id')->on('molecular_reg_tests')->onDelete('cascade');
        $table->foreign('test_id')->references('test_id')->on('molecular_reg_tests')->onDelete('cascade'); // New test-specific foreign key
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


