<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitor;

class VisitorController extends Controller
{
   
    
    public function index(Request $request)
    {
        try {
            return response()->json(Visitor::with(['building', 'office', 'employee'])->get(), 200);
        } catch (\Exception $e) {
            \Log::error('Error retrieving visitors: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to retrieve visitors'], 500);
        }
    }
    

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:15', // Add phone validation
        'building_id' => 'required|exists:buildings,id',
        'office_id' => 'required|exists:offices,id',
        'employee_id' => 'required|exists:employees,id',
        'reason' => 'required|string|max:255',
        'company' => 'required|string|max:255',
    ]);

    $visitor = Visitor::create($validatedData);

    return response()->json(['message' => 'Visitor added successfully', 'visitor' => $visitor], 201);
}




public function update(Request $request, $id)
{
    $visitor = Visitor::findOrFail($id);
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'date' => 'required|date',
        'building_id' => 'required|exists:buildings,id',
        'office_id' => 'required|exists:offices,id',
        'employee_id' => 'required|exists:employees,id',
        'purpose' => 'required|string|max:255',
        'newVisitor' => 'required|boolean',
    ]);

    $visitor->update($validatedData);

    return response()->json($visitor);
}

public function destroy($id)
{
    Visitor::destroy($id);
    return response()->json(['message' => 'Visitor deleted successfully.']);
}

}
