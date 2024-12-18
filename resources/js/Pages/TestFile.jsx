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




import React from "react";
import { useForm } from "@inertiajs/react";

const CreateMolecularResult = ({ tests }) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        results: {}, // Object to hold the form data dynamically
    });

    console.log('from create molecular reuslt',data);

    const handleFieldChange = (testId, fieldName, value) => {
        setData("results", {
            ...data.results,
            [testId]: { ...data.results[testId], [fieldName]: value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("results.store"), {
            onSuccess: () => {
                alert("Results submitted successfully!");
                reset();
            },
        });
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                Enter Test Results
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                    >
                        {/* Test Title */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            {test.test_name} <span className="text-sm text-gray-500">(Fee: {test.test_fee} | Date: {test.test_date})</span>
                        </h3>

                        {/* Sample ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Sample ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Sample ID"
                                    value={test.sample?.sample_id || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "sample_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Patient ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Patient ID"
                                    value={test.patient_id || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "patient_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Test ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Test ID"
                                    value={test.test_id || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "test_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Investigation */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Investigation
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Investigation"
                                    value={test.test_name || ""}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            test.id,
                                            "investigation",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Result and Unit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Result
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Result"
                                    value={data.results[test.id]?.result || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "result", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Unit
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Unit"
                                    value={data.results[test.id]?.unit || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "unit", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Methodology */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">
                                Methodology
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Methodology"
                                value={data.results[test.id]?.methodology || ""}
                                onChange={(e) =>
                                    handleFieldChange(
                                        test.id,
                                        "methodology",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Remarks */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">
                                Remarks
                            </label>
                            <textarea
                                placeholder="Enter Remarks"
                                value={data.results[test.id]?.remarks || ""}
                                onChange={(e) =>
                                    handleFieldChange(test.id, "remarks", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Comments */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Comments
                            </label>
                            <textarea
                                placeholder="Enter Comments"
                                value={data.results[test.id]?.comments || ""}
                                onChange={(e) =>
                                    handleFieldChange(test.id, "comments", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white w-full px-6 py-2 rounded-md hover:bg-blue-700"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit Results"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMolecularResult;
