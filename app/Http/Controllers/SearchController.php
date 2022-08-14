<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    //

    public function showFiles(Request $request)
    {
        $user = $request->user();
        $searchQuery = $request->query('query', '');

        $files = $user->files()->orderBy('order')->get();

        return $files;
    }
}
