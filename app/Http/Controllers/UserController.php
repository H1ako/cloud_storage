<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // Log::info($request->post());

        $validatedData = $request->validate([
            'email' => 'email|required',
            'password' => 'min:8|max:40|same:passwordAgain|nullable',
            'passwordAgain' => 'same:password|nullable',
            'picture' => 'image'
        ]);

        $user->email = $validatedData['email'];
        if ($validatedData['password']) $user->setPassword($validatedData['password']);
        if ($validatedData['picture']) {
            $user->setPicture($validatedData['picture']);
        }
        $user->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $subscriptionId
     * @return \Illuminate\Http\Response
     */
    public function updateSubscription($subscriptionId, Request $request)
    {
        $user = $request->user();
        $subscription = Subscription::find($subscriptionId);
        if ($subscription) {
            $user->subscription_name= $subscription->name;
            $user->save();
        }

        return redirect()->back();
    }
}
