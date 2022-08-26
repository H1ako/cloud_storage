<?php

namespace App\Http\Middleware;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        // auth
        $user = $request->user();
        $mostCheckedFiles = $user ? $user->files->filter(function ($file) {
            return $file->checkedBy > 0;
        })->sortByDesc('checkedBy') : [];

        // global data
        $subscriptions = Subscription::orderBy('price')->get();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'mostCheckedFiles' => $mostCheckedFiles
            ],
            'globalData' => [
                'subscriptions' => $subscriptions
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
