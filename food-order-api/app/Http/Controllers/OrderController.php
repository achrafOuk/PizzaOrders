<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $order = Order::select('_id','id','customer','total','address','status')
        ->orderBy('id', 'desc')
        ->paginate(5);
        return response()->json($order);
    }
    public function show($id)
    {
        $id = intval($id);
        $order = Order::where('id','=',$id);
        if($order==NULL)
        {
            return response()->json([ 'response'=>'order does not exists' ]);
        }
        $order = $order->select('_id','customer','total','address','status')->first();
        return response()->json($oder);
    }
    public function store(Request $request){
         $this->validate($request,[
            'customer'=>'required',
            'order'=>'required',
            'address'=>'required',
         ]);
        $count= Order::all()->count();
        $id = ( $count === 0 ) ? 1 : Order::all()->last()->id + 1;
        $orders = $request->input('order');
        $total = 0;
        if(count($orders)==0)
        {
            return response()->json([ 'response'=>'cannot checkout,the cart is empty' ]);
        }
        foreach($orders as $food)
        {
            $price = Food::where('id','=',$food['id'])->get()->first()->food_price;
            $total += $price * $food['quantity'];
        }
        $order = Order::create([
            'id'=>$id,
            'customer'=> $request->input('customer'),
            'status' => 'payment',
            'order' => $orders,
            'total' => $total,
            'address'=>$request->input('address')
         ]);
         $order_id =  $order->get()->first()->_id;
        return response()->json([ 'response'=>'order was paid','id'=> $order_id ,'order'=>$order ]);
    }

    public function update_order_status($id){
        $id = intval($id);
        $order = order::where('id','=',$id);
        if($order->count()==0){
            return response()->json([ 'response'=>'order does not exists' ]);
        }
        $status = ['payment','prepayring','on the way','delivered'];
        $order = $order->first();
        $order_status = $order->status;
        $current_status_id = array_search($order_status,$status);
        if ($current_status_id+1==count($status)-1)
        {
            return response()->json([ 'response'=>'cannot update the status of the order' ]);
        }
         $order->update([
            'status' => $status[$current_status_id+1] ,
         ]);

        return response()->json([ 'response'=>'order status was updated' ]);
    }
}
