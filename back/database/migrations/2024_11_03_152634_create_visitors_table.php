<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitorsTable extends Migration
{
    public function up()
{
    Schema::create('visitors', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('phone');
        $table->foreignId('building_id')->constrained();
        $table->foreignId('office_id')->constrained();
        $table->foreignId('employee_id')->constrained();
        $table->string('reason'); // Make sure this line exists
        $table->string('company'); // Make sure this line exists
        $table->timestamps();
    });
}


    public function down()
    {
        Schema::dropIfExists('visitors');
    }
}
