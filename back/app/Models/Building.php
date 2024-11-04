<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    protected $fillable = ['name']; // Define fillable fields

    public function offices()
    {
        return $this->hasMany(Office::class); // Define relationship with Office
    }

    public function employees()
    {
        return $this->hasMany(Employee::class); // Define relationship with Employee
    }
    public function visitors()
    {
        return $this->hasMany(Visitor::class);
    }
}
