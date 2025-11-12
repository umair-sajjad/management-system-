<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacultyController extends Controller
{
    /**
     * Display the faculty dashboard.
     */
    public function dashboard(): Response
    {
        return Inertia::render('Faculty/Dashboard');
    }

    /**
     * Display events management page.
     */
    public function manageEvents(): Response
    {
        return Inertia::render('Faculty/ManageEvents');
    }

    /**
     * Display feed management page.
     */
    public function manageFeed(): Response
    {
        return Inertia::render('Faculty/ManageFeed');
    }

    /**
     * Display discussions page.
     */
    public function discussions(): Response
    {
        return Inertia::render('Faculty/Discussions');
    }

    /**
     * Display feed page.
     */
    public function feed(): Response
    {
        return Inertia::render('Faculty/Feed');
    }

    /**
     * Display share resource page.
     */
    public function shareResource(): Response
    {
        return Inertia::render('Faculty/ShareResource');
    }
}
