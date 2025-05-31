<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(Experience::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'jobTitle' => 'required|string|max:255',
            'company'  => 'required|string|max:255',
            'Details'  => 'required|string',
            'years'    => 'required|string|max:255',
        ]);
        $experience = Experience::create($data);
        return response()->json($experience, 201);
    }

    public function show($id)
    {
        return response()->json(Experience::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $data = $request->validate([
            'jobTitle' => 'sometimes|required|string|max:255',
            'company'  => 'sometimes|required|string|max:255',
            'Details'  => 'sometimes|required|string',
            'years'    => 'sometimes|required|string|max:255',
        ]);
        $experience->update($data);
        return response()->json($experience);
    }

    public function destroy($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();
        return response()->json(['message' => 'Deleted'], 204);
    }
}