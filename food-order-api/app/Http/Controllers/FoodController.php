<?php
namespace App\Http\Controllers;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
class FoodController extends Controller
{
    //show all the Food
    
    public function index(){
        return Food::all();
    }
    //store new element
    public function store(Request $request){
         $this->validate($request,[
            'food_name'=>'required',
            'food_price'=>'required',
            'food_description'=>'required',
            'food_image'=>'required'
         ]);
        try{
            //Food::truncate();
            $count= Food::all()->count();
            $id = ( $count === 0 ) ? 1 : Food::all()->last()->id + 1;
            $food_name =$request->input('food_name');
            if( Food::where('food_name',$food_name)->count() )
            {
                return response()->json([
                    'response'=>'food is already exists'
                ]);
            }
            //store images
            $filenameWithExt = $request->file('food_image')->getClientOriginalName();
            $fileNameToStore = 'food_'.$id.'.png';
            $food_image = $request->file("food_image")->storeAs("public/image", $fileNameToStore);
            Food::create([
                'id'=>$id,
                'food_name'=> $food_name,
                'food_image'=>$fileNameToStore ,
                'food_price' => $request->input('food_price'),
                'food_description' => $request->input('food_description')
            ]);
            return response()->json([
                'response'=>'food was added'
            ],502);
            
        }
        catch(excetption $e){
            return response()->json([ 'response'=>'Error has occur' ]);
        }
    }
    public function show($id){
        $id = intval($id);
        $result = Food::where('id','=',$id);
        if ($result==NULL) {
        return response()->json([ 'response'=>'pizza does not exists' ]); 
        }
        return $result->first();
    }
    //update element
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'food_name'=>'required',
            'food_price'=>'required',
            'food_description'=>'required',
            'food_image'=>'required'
         ]);
        $id = intval($id);
        $food = Food::where('id',$id);
        if($food->count()==0){
            return response()->json([ 'response'=>'pizza does not exists' ]);
        }
        $food_name =$request->input('food_name');
        if( Food::where('food_name',$food_name)->where('id','!=',$id)->count() )
        {
            return response()->json([
                'response'=>'food is already exists'
            ]);
        }
        //store images
        $filenameWithExt = $request->file('food_image')->getClientOriginalName();
        $fileNameToStore = 'food_'.$id.'.png';
        $food_image = $request->file("food_image")->storeAs("public/image", $fileNameToStore);
        $food->update([
                'food_name'=> $food_name,
                'food_image'=>$fileNameToStore,
                'food_price' => $request->input('food_price'),
                'food_description' => $request->input('food_description'),
            ]);
        return response()->json([ 'response'=>'pizza was updated' ]);
    }
    //delete food
    public function destroy($id)
    {
        $id = intval($id);
        $food = new Food;
        $food = $food::where('id','=',$id);
        if($food==NULL)
        {
            return response()->json([ 'response'=>'pizza does not exists' ]);
        }
        $food->delete();
        return response()->json([
            'response'=>'pizza was deleted'
        ]);
    }
     public function getPubliclyStorgeFile($filename)
    {
        // get the path of the image
        $path = storage_path('app/public/image/'. $filename);
        //check if image does not exists, show 404 page
        if ( !File::exists($path)  ) {
            return Response::make('File not found.', 404);
        }
        // return the image
        $file = File::get($path);
        $type = File::mimeType($path);
        $response = Response::make($file, 202);
        $response->header("Content-Type", $type);
        return $response;
    }	
}
