<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PersonalInfo;
use Illuminate\Support\Facades\Storage;

class PersonalInfoController extends Controller
{
    public function index()
    {
        // يرجع أول سجل فقط (لأن البيانات شخصية واحدة فقط)
        $info = PersonalInfo::first();
        return response()->json($info);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'fullName'    => 'required|string|max:255',
            'jobTitles'   => 'required|string|max:255',
            'bio'         => 'required|string',
            'image'       => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('personal_images', 'public');
            $data['image'] = asset('storage/' . $data['image']);
        }
        $info = PersonalInfo::create($data);
        return response()->json($info, 201);
    }

    public function show($id)
    {
        return response()->json(PersonalInfo::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $info = PersonalInfo::findOrFail($id);
        $data = $request->validate([
            'fullName'    => 'sometimes|required|string|max:255',
            'jobTitles'   => 'sometimes|required|string|max:255',
            'bio'         => 'sometimes|required|string',
            'image'       => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('image')) {
            // حذف الصورة القديمة إن وجدت
            if ($info->image && file_exists(public_path(parse_url($info->image, PHP_URL_PATH)))) {
                @unlink(public_path(parse_url($info->image, PHP_URL_PATH)));
            }
            $data['image'] = $request->file('image')->store('personal_images', 'public');
            $data['image'] = asset('storage/' . $data['image']);
        }
        $info->update($data);
        return response()->json($info);
    }

    public function destroy($id)
    {
        $info = PersonalInfo::findOrFail($id);
        if ($info->image && file_exists(public_path(parse_url($info->image, PHP_URL_PATH)))) {
            @unlink(public_path(parse_url($info->image, PHP_URL_PATH)));
        }
        $info->delete();
        return response()->json(['message' => 'Deleted'], 204);
    }
}