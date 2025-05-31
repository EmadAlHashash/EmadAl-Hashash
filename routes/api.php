<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PersonalInfoController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ProjectController;

Route::apiResource('personal-info', PersonalInfoController::class)->only(['index', 'store', 'update', 'destroy', 'show']);
Route::apiResource('education',     EducationController::class);
Route::apiResource('experience',    ExperienceController::class);
Route::apiResource('skills',        SkillController::class);
Route::apiResource('projects',      ProjectController::class);