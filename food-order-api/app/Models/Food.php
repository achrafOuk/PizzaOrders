<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
class Food extends Eloquent
{
   use HasFactory;
   protected $connection = 'mongodb';
   public $collection = 'food';
   public $timestamps = false;
   protected $fillable = [ 'id', 'food_image', 'food_name', 'food_price', 'food_description' ];

}
