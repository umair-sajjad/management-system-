<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    /**
     * Display the student dashboard.
     */
    public function dashboard(): Response
    {
        return Inertia::render('Student/Dashboard');
    }

    /**
     * Display events page.
     */
    public function events(): Response
    {
        return Inertia::render('Events');
    }

    /**
     * Display discussions page.
     */
    public function discussions(): Response
    {
        return Inertia::render('Discussions');
    }

    /**
     * Display downloads page.
     */
    public function downloads(): Response
    {
        return Inertia::render('Downloads');
    }

    /**
     * Display feed page.
     */
    public function feed(): Response
    {
        return Inertia::render('Feed');
    }
}
