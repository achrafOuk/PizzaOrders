import { routes } from "../../../routes";

export default async (req,res)=>{
    if ( req.method === 'POST' )
    {
        let cookies = req?.cookies?.access_token;
        if( cookies===undefined || cookies===null )
        {
            return res.status(500).json({ error: 'you are unauthorized',status:500 });
        }
        let {food_name,food_price,food_description,food_image} = req;
        try{
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookies}`);
            myHeaders.append("Content-Type", "application/json");
            let data = {
                food_name: food_name,
                food_pirce: food_price,
                food_description: food_description,
                food_image: food_image,
            };
            let requestOptions = {
            method: "POST",
            body: data,
            redirect: "follow",
            };
            let result = await fetch(routes.ADD_FOOD, requestOptions);
            let response = await result.json()
            return res.status(result.tatus).json({ response: response });
        }
        catch( err )
        {
            return res.status(500).json({ success: `an error has occured` });
        }
    }
    else{
        return res.status(500).json({ success: `method ${req.method} is not supported` });
    }
}