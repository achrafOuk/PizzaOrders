<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=>'foods'],function(){
    Route ::get('',[FoodController::class,'index']);
    Route ::get('pagination',[FoodController::class,'paginate']);
    Route ::post('create',[FoodController::class,'store']);
    Route ::get('{id}',[FoodController::class,'show']);
    Route ::post('update/{id}',[FoodController::class,'update']);
    Route ::post('delete/{id}',[FoodController::class,'destroy']);
    Route ::get('image/{filename}',[FoodController::class,'getPubliclyStorgeFile']);
});

Route::group(['prefix'=>'order'],function(){
    Route ::get('',[OrderController::class,'index']);
    Route ::post('checkout',[OrderController::class,'store']);
    Route ::post('update-status/{id}',[OrderController::class,'update_order_status']);
    Route ::get('show-order/{id}',[OrderController::class,'show']);
});


Route ::post('register',[UserController::class,'register']);
Route ::post('login',[UserController::class,'login']);