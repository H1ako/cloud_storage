<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;


class SearchController extends Controller
{
    public function showFiles(Request $request)
    {
        $user = $request->user();
        $searchQuery = $request->query('query', '');
        if (!$searchQuery) return [];
        
        $isOnlyUserFiles = $request->query('isOnlyUserFiles', false);

        if ($isOnlyUserFiles) {
            $files = $user->files()->where('name', 'like', "%$searchQuery%")
                                    ->orWhere('shareLink', 'like', "%$searchQuery%")
                                    ->orderBy('order')->get();
        }
        else {
            $userFiles = $user->files()->where('name', 'like', "%$searchQuery%")
                                        ->orWhere('shareLink', 'like', "%$searchQuery%")
                                        ->orderBy('order')->get();
            $otherFiles = File::where('user_id', '!=', $user->id)
                        ->where('shareLink', '!=', 'NULL')
                        ->where(function ($query) use ($searchQuery) {
                            $query->where('name', 'like', "%$searchQuery%")
                                ->orWhere('shareLink', 'like', "%$searchQuery%");
                        })
                        ->orderBy('created_at')->get();
            $files = $userFiles->merge($otherFiles);
        }
        
        return $files;
    }
}
