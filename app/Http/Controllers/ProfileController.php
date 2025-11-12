<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $roleData = null;

        // Load role-specific data
        switch ($user->role) {
            case 'student':
                $roleData = $user->student;
                break;
            case 'admin':
                $roleData = $user->admin;
                break;
            case 'faculty':
                $roleData = $user->faculty;
                break;
            case 'club_admin':
                $roleData = $user->clubAdmin;
                break;
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'roleData' => $roleData,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture && \Storage::disk('public')->exists($user->profile_picture)) {
                \Storage::disk('public')->delete($user->profile_picture);
            }

            // Store new profile picture
            $path = $request->file('profile_picture')->store('profile-pictures', 'public');
            $validated['profile_picture'] = $path;
        }

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Update role-specific data
        $this->updateRoleData($user, $request);

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Update role-specific profile data.
     */
    private function updateRoleData($user, Request $request): void
    {
        switch ($user->role) {
            case 'student':
                if ($user->student) {
                    $user->student->update($request->only(['student_id', 'department', 'year', 'semester']));
                } else {
                    $user->student()->create($request->only(['student_id', 'department', 'year', 'semester']));
                }
                break;

            case 'faculty':
                if ($user->faculty) {
                    $user->faculty->update($request->only(['faculty_id', 'department', 'designation', 'specialization']));
                } else {
                    $user->faculty()->create($request->only(['faculty_id', 'department', 'designation', 'specialization']));
                }
                break;

            case 'admin':
                if ($user->admin) {
                    $user->admin->update($request->only(['admin_level']));
                } else {
                    $user->admin()->create($request->only(['admin_level']));
                }
                break;

            case 'club_admin':
                if ($user->clubAdmin) {
                    $user->clubAdmin->update($request->only(['club_name', 'club_type', 'position']));
                } else {
                    $user->clubAdmin()->create($request->only(['club_name', 'club_type', 'position']));
                }
                break;
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
