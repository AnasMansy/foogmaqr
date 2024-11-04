<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event; // Make sure to create the Event model

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

    public function store(Request $request)
    {
        $event = Event::create($request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'client' => 'required|string',
            'date' => 'required|date',
        ]));

        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'client' => 'required|string',
            'date' => 'required|date',
        ]));

        return response()->json($event);
    }

    public function destroy($id)
    {
        Event::destroy($id);
        return response()->json(['message' => 'Event deleted successfully.']);
    }
}
