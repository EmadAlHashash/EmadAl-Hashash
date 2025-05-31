<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Education;

class EducationController extends Controller
{
    public function index()
    {
        return response()->json(Education::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'degree'         => 'required|string|max:255',
            'university'     => 'required|string|max:255',
            'thedetails'     => 'required|string',
            'graduationYear' => 'required|string|max:255',
        ]);
        $education = Education::create($data);
        return response()->json($education, 201);
    }

    public function show($id)
    {
        return response()->json(Education::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $data = $request->validate([
            'degree'         => 'sometimes|required|string|max:255',
            'university'     => 'sometimes|required|string|max:255',
            'thedetails'     => 'sometimes|required|string',
            'graduationYear' => 'sometimes|required|string|max:255',
        ]);
        $education->update($data);
        return response()->json($education);
    }

    public function destroy($id)
    {
        $education = Education::findOrFail($id);
        $education->delete();
        return response()->json(['message' => 'Deleted'], 204);
    }
}