<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
public function index()
{
    $personal = \App\Models\PersonalInfo::first();
    $educations = \App\Models\Education::all();
    $experiences = \App\Models\Experience::all();
    $skills = \App\Models\Skill::all();
    $projects = \App\Models\Project::all();

    return view('home.home', compact('personal', 'educations', 'experiences', 'skills', 'projects'));
}

public function about()     { return $this->index(); }
public function portfolio() { return $this->index(); }
public function contact()   { return $this->index(); }
}