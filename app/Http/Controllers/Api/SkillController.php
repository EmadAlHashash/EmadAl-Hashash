<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'skillName' => 'required|string|max:255',
            'level'     => 'required|string|max:255',
        ]);
        $skill = Skill::create($data);
        return response()->json($skill, 201);
    }

    public function show($id)
    {
        return response()->json(Skill::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $data = $request->validate([
            'skillName' => 'sometimes|required|string|max:255',
            'level'     => 'sometimes|required|string|max:255',
        ]);
        $skill->update($data);
        return response()->json($skill);
    }

    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();
        return response()->json(['message' => 'Deleted'], 204);
    }
}