<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = ['name', 'building_id']; // Ensure you include fillable fields

    public function building()
    {
        return $this->belongsTo(Building::class);
    }
    public function visitors()
    {
        return $this->hasMany(Visitor::class);
    }
}
