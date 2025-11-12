<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Student;
use App\Models\Admin;
use App\Models\Faculty;
use App\Models\ClubAdmin;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        Admin::create([
            'user_id' => $adminUser->id,
            'admin_level' => 'super',
            'permissions' => ['manage_users', 'manage_events', 'manage_resources'],
        ]);

        // Create Student User
        $studentUser = User::create([
            'name' => 'Student User',
            'email' => 'student@test.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'user_id' => $studentUser->id,
            'student_id' => 'STU2025001',
            'department' => 'Computer Science',
            'year' => '3rd Year',
            'semester' => '6th Semester',
        ]);

        // Create Faculty User
        $facultyUser = User::create([
            'name' => 'Faculty User',
            'email' => 'faculty@test.com',
            'password' => Hash::make('password'),
            'role' => 'faculty',
            'email_verified_at' => now(),
        ]);

        Faculty::create([
            'user_id' => $facultyUser->id,
            'faculty_id' => 'FAC2025001',
            'department' => 'Computer Science',
            'designation' => 'Assistant Professor',
            'specialization' => 'Artificial Intelligence',
        ]);

        // Create Club Admin User
        $clubAdminUser = User::create([
            'name' => 'Club Admin User',
            'email' => 'clubadmin@test.com',
            'password' => Hash::make('password'),
            'role' => 'club_admin',
            'email_verified_at' => now(),
        ]);

        ClubAdmin::create([
            'user_id' => $clubAdminUser->id,
            'club_name' => 'Tech Club',
            'club_type' => 'Technical',
            'position' => 'President',
        ]);
    }
}
