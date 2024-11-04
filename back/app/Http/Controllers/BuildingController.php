<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    public function index()
    {
        return Building::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
    
        $building = new Building();
        $building->name = $request->name;
        $building->save();
    
        return response()->json($building, 201);
    }
    
    public function show(Building $building)
    {
        return $building;
    }

    public function update(Request $request, Building $building)
    {
        $request->validate(['name' => 'sometimes|required|string|max:255']);
        $building->update($request->all());
        return $building;
    }

    public function destroy(Building $building)
    {
        $building->delete();
        return response()->noContent();
    }
}
