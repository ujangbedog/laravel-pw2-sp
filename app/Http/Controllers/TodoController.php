<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Display a paginated list of todos
    public function index()
    {
        $todos = Todo::paginate(10);
        return response()->json($todos);
    }

    // Store a new todo item
    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        // Create and return the new todo item
        $todo = Todo::create([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => $request->completed,
        ]);

        return response()->json($todo, 201);
    }

    // Display a specific todo item by ID
    public function show($id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    // Update a specific todo item by ID
    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        // Find and update the todo item
        $todo = Todo::findOrFail($id);
        $todo->update([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => $request->completed,
        ]);

        return response()->json($todo);
    }

    // Delete a specific todo item by ID
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(null, 204);
    }
}
