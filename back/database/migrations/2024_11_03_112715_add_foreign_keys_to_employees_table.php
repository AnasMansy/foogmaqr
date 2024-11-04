<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToEmployeesTable extends Migration
{
    public function up()
    {
        // Check if the foreign keys exist before attempting to add them
        if (!Schema::hasTable('employees')) {
            return;
        }

        Schema::table('employees', function (Blueprint $table) {
            // Add foreign key for building_id if it doesn't exist
            if (!Schema::hasColumn('employees', 'building_id')) {
                $table->foreign('building_id')->references('id')->on('buildings')->onDelete('cascade');
            }
            
            // Add foreign key for office_id if it doesn't exist
            if (!Schema::hasColumn('employees', 'office_id')) {
                $table->foreign('office_id')->references('id')->on('offices')->onDelete('cascade');
            }
        });
    }

    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['building_id']);
            $table->dropForeign(['office_id']);
        });
    }
}
