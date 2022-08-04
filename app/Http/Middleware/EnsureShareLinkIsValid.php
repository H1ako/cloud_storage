<?php

namespace App\Http\Middleware;

use App\Models\File;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EnsureShareLinkIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $fileShareLink = $request->route()->parameter('shareLink');
        $fileExists = File::where('shareLink', $fileShareLink)->exists();
        
        if ($fileExists) return $next($request);

        return redirect()->route('home');
    }
}
