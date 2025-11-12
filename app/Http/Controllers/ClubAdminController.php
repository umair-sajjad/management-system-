<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClubAdminController extends Controller
{
    /**
     * Display the club admin dashboard.
     */
    public function dashboard(): Response
    {
        return Inertia::render('ClubAdmin/Dashboard');
    }

    /**
     * Display students management page.
     */
    public function manageStudents(): Response
    {
        return Inertia::render('ClubAdmin/ManageStudents');
    }

    /**
     * Display events management page.
     */
    public function manageEvents(): Response
    {
        return Inertia::render('ClubAdmin/ManageEvants');
    }

    /**
     * Display discussions page.
     */
    public function discussions(): Response
    {
        return Inertia::render('ClubAdmin/Discussions');
    }

    /**
     * Display feedbacks page.
     */
    public function feedbacks(): Response
    {
        return Inertia::render('ClubAdmin/Feedbacks');
    }

    /**
     * Display share resource page.
     */
    public function shareResource(): Response
    {
        return Inertia::render('ClubAdmin/ShareResource');
    }
}
