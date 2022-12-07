<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    function register()
    {
        // dd('register');
        User::create([
            'name'=>"achraf",
            'email'=>'achraf@maiil.com',
            // 'password' => Hash::make($request->password),
            'password' => Hash::make('123'),
        ]);
        return response()->json([ 'response'=>'user was created']);
    }
    function login(Request $request)
    {
        $this->validate($request, [
            'name'=>'required',
            'password'=>'required',
        ]);
        if(!auth()->attempt($request->only('password', 'name')) ){
            return response()->json([ 'response'=>'Username or password are wrong'],500);

        }
        // $user = User::find("63212b2fba02000054004a33");
        $username =$request->name; 
        //$user = User::where('name',$username)->get()->first();
        $access_token = auth()->user()->createToken('auth token')->accessToken;
        return response()->json([
        'response'=>'User is authenticated',
        'access_token'=>$access_token,
        "username"=>$username],200);
    }
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200); //Status 200
    }
}
