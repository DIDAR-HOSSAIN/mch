<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoperegsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doperegs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('patient_id');
            $table->date('reg_date');
            $table->string('name');
            $table->string('sex');
            $table->string('passport_no');
            $table->string('address');
            $table->string('district');
            $table->string('thana');
            $table->integer('contact_no');
            $table->string('image');
            $table->date('dob');
            $table->integer('age');
            $table->string('nid');
            $table->string('collection_type');
            $table->string('reference');
            $table->integer('reg_fee');
            $table->integer('discount');
            $table->integer('total');
            $table->integer('paid');
            $table->string('payment_type');
            $table->string('account_head');
            $table->string('user_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doperegs');
    }
}
