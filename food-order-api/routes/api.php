<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;

Route::group(['prefix'=>'foods'],function(){
    Route ::get('image/{filename}',[FoodController::class,'getPubliclyStorgeFile']);
    Route ::get('{id}',[FoodController::class,'show']);
    Route ::get('',[FoodController::class,'index']);
    Route::group(['middleware'=>'auth:api'],function(){
        Route ::post('create',[FoodController::class,'store']);
        Route ::post('update/{id}',[FoodController::class,'update']);
        Route ::post('delete/{id}',[FoodController::class,'destroy']);
    });
});

Route::group(['prefix'=>'order'],function(){
    Route::group(['middleware'=>'auth:api'],function(){
        Route ::get('',[OrderController::class,'index']);
        Route ::post('update-status/{id}',[OrderController::class,'update_order_status']);
    });
    Route ::post('checkout',[OrderController::class,'store']);
    Route ::get('show-order/{id}',[OrderController::class,'show']);
});

Route ::post('register',[UserController::class,'register']);
Route ::post('login',[UserController::class,'login']);