<?php
namespace App\Http\Controllers;

use App\Models\Office; // Make sure to import your Office model
use App\Models\Building; // Import Building model for validation
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    public function index()
    {
        return Office::with('building')->get(); // Include relations if necessary
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'building_id' => 'required|exists:buildings,id', // Ensure building_id exists
        ]);

        // Create and return the new Office
        $office = Office::create($request->all());
        return response()->json($office, 201); // Respond with a 201 Created status
    }

    public function show(Office $office)
    {
        return $office->load('building'); // Include relations if necessary
    }

      // Update a specific office
      public function update(Request $request, Office $office)
      {
          $request->validate([
              'name' => 'sometimes|required|string|max:255', // Validate name only if provided
              'building_id' => 'sometimes|required|exists:buildings,id', // Validate building_id if provided
          ]);
  
          // Update the office and return the updated instance
          $office->update($request->all());
          return response()->json($office);
      }

    public function destroy(Office $office)
    {
        $office->delete();
        return response()->noContent();
    }
}
