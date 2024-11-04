<?php

namespace App\Http\Controllers;

use App\Models\Employee; // Make sure to import your Employee model
use App\Models\Building; // Import Building model if you need it for validation
use App\Models\Office; // Import Office model if you need it for validation
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::with(['building', 'office'])->get(); // Include relations if necessary
    }

    public function store(Request $request)
{
    // Validate the incoming request data
    $request->validate([
        'name' => 'required|string|max:255',
        'building_id' => 'required|exists:buildings,id',
        'office_id' => 'required|exists:offices,id',
    ]);

    try {
        // Create a new employee
        $employee = Employee::create([
            'name' => $request->name,
            'building_id' => $request->building_id,
            'office_id' => $request->office_id,
        ]);

        return response()->json($employee, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to create employee: ' . $e->getMessage()], 500);
    }
}

    
  
      // Retrieve a specific employee along with their building and office
      public function show(Employee $employee)
      {
          return $employee->load(['building', 'office']); // Include relations if necessary
      }
  
      // Update a specific employee
      public function update(Request $request, Employee $employee)
      {
          $request->validate([
              'name' => 'sometimes|required|string|max:255',
              'building_id' => 'sometimes|required|exists:buildings,id',
              'office_id' => 'sometimes|required|exists:offices,id',
          ]);
  
          // Update the employee and return the updated instance
          $employee->update($request->all());
          return response()->json($employee);
      }
  
      // Delete a specific employee
      public function destroy(Employee $employee)
      {
          $employee->delete(); // Delete the employee
          return response()->noContent(); // Respond with a 204 No Content status
      }
}
