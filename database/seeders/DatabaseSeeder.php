<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
       public function run(): void
    {
       DB::table('users')->insert([
            'name' => 'Emad AlHashash',
            'email' => 'emadhashash76@gmail.com',
            'password' => Hash::make('0771222383Em@d'),
        ]);
    }
}
