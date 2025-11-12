<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }

    /**
     * Display students management page.
     */
    public function manageStudents(): Response
    {
        $students = User::with('student')
            ->where('role', 'student')
            ->select('id', 'name', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/ManageStudents', [
            'students' => $students,
        ]);
    }

    /**
     * Store a new student.
     */
    public function storeStudent(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'student_id' => 'nullable|string|max:50',
            'department' => 'nullable|string|max:100',
            'year' => 'nullable|string|max:20',
            'semester' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'student',
        ]);

        $user->student()->create([
            'student_id' => $validated['student_id'] ?? null,
            'department' => $validated['department'] ?? null,
            'year' => $validated['year'] ?? null,
            'semester' => $validated['semester'] ?? null,
        ]);

        return redirect()->route('admin.students')->with('success', 'Student created successfully!');
    }

    /**
     * Update an existing student.
     */
    public function updateStudent(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'student_id' => 'nullable|string|max:50',
            'department' => 'nullable|string|max:100',
            'year' => 'nullable|string|max:20',
            'semester' => 'nullable|string|max:20',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($user->student) {
            $user->student->update([
                'student_id' => $validated['student_id'] ?? null,
                'department' => $validated['department'] ?? null,
                'year' => $validated['year'] ?? null,
                'semester' => $validated['semester'] ?? null,
            ]);
        } else {
            $user->student()->create([
                'student_id' => $validated['student_id'] ?? null,
                'department' => $validated['department'] ?? null,
                'year' => $validated['year'] ?? null,
                'semester' => $validated['semester'] ?? null,
            ]);
        }

        return redirect()->route('admin.students')->with('success', 'Student updated successfully!');
    }

    /**
     * Delete a student.
     */
    public function destroyStudent(User $user)
    {
        if ($user->role !== 'student') {
            return redirect()->route('admin.students')->with('error', 'User is not a student!');
        }

        $user->delete();

        return redirect()->route('admin.students')->with('success', 'Student deleted successfully!');
    }

    /**
     * Display roles management page.
     */
    public function manageRoles(): Response
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/ManageRoles', [
            'users' => $users,
        ]);
    }

    /**
     * Store a new user/member.
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => ['required', Rule::in(['admin', 'student', 'faculty', 'club_admin'])],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('admin.roles')->with('success', 'User created successfully!');
    }

    /**
     * Update an existing user/member.
     */
    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', Rule::in(['admin', 'student', 'faculty', 'club_admin'])],
        ]);

        $user->update($validated);

        return redirect()->route('admin.roles')->with('success', 'User updated successfully!');
    }

    /**
     * Delete a user/member.
     */
    public function destroyUser(User $user)
    {
        $user->delete();

        return redirect()->route('admin.roles')->with('success', 'User deleted successfully!');
    }

    /**
     * Display events management page.
     */
    public function manageEvents(): Response
    {
        return Inertia::render('Admin/ManageEvants');
    }

    /**
     * Display discussions page.
     */
    public function discussions(): Response
    {
        return Inertia::render('Admin/Discussions');
    }

    /**
     * Display feedbacks page.
     */
    public function feedbacks(): Response
    {
        return Inertia::render('Admin/Feedbacks');
    }

    /**
     * Display share resource page.
     */
    public function shareResource(): Response
    {
        return Inertia::render('Admin/ShareResource');
    }
}
