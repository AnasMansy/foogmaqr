<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = [
        'name', 'phone', 'building_id', 'office_id', 'employee_id', 'reason', 'company'
    ];

    public function building()
    {
        return $this->belongsTo(Building::class);
    }
    
    public function office()
    {
        return $this->belongsTo(Office::class);
    }
    
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
