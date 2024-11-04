<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['name', 'building_id', 'office_id']; // Define fillable fields

    public function building()
    {
        return $this->belongsTo(Building::class); // Define relationship with Building
    }

    public function office()
    {
        return $this->belongsTo(Office::class); // Define relationship with Office
    }
    public function visitors()
    {
        return $this->hasMany(Visitor::class);
    }
}
