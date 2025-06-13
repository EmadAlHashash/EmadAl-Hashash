<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');
        $query = Project::orderBy('created_at', 'desc');

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        if ($request->query('dashboard') === 'true') {
            $projects = $query->paginate(3);
            // في حالة لوحة التحكم نستفيد من هيكلية paginate
        } else {
            $projects = $query->get();
            // لضمان توافق الشكل مع الواجهة الرئيسية يمكننا لف النتيجة داخل مفتاح data
            $projects = ['data' => $projects];
        }

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'            => 'required|string|max:255',
            'details'          => 'required|string',
            'technologiesused' => 'required|string|max:255',
            'Role'             => 'required|string|max:255',
            'ViewOnline'       => 'required|url',
            'type'             => 'required|string|max:255',
            'image'            => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('project_images', 'public');
            $data['image'] = asset('storage/' . $data['image']);
        }

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    public function show($id)
    {
        return response()->json(Project::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $data = $request->validate([
            'title'            => 'sometimes|required|string|max:255',
            'details'          => 'sometimes|required|string',
            'technologiesused' => 'sometimes|required|string|max:255',
            'Role'             => 'sometimes|required|string|max:255',
            'ViewOnline'       => 'sometimes|required|url',
            'type'             => 'sometimes|required|string|max:255',
            'image'            => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image && file_exists(public_path(parse_url($project->image, PHP_URL_PATH)))) {
                @unlink(public_path(parse_url($project->image, PHP_URL_PATH)));
            }

            $data['image'] = $request->file('image')->store('project_images', 'public');
            $data['image'] = asset('storage/' . $data['image']);
        }

        $project->update($data);

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        if ($project->image && file_exists(public_path(parse_url($project->image, PHP_URL_PATH)))) {
            @unlink(public_path(parse_url($project->image, PHP_URL_PATH)));
        }

        $project->delete();

        return response()->json(['message' => 'Deleted'], 204);
    }
}
