<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'email' => 'email',
            'password' => 'min:8|max:40',
            'passwordAgain' => 'same:password|required_if:password'
        ]);

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
