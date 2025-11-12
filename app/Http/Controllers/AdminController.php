<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        return Inertia::render('Admin/ManageRoles');
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
