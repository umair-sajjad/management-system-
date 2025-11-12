<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        return Inertia::render('Admin/ManageStudents');
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
