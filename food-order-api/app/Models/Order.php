<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
class Order extends Eloquent
{
   use HasFactory;
   protected $connection = 'mongodb';
   public $collection = 'orders';
   public $timestamps = false;
   protected $fillable = [ 'id', 'customer', 'status', 'order','total','address'];

}
