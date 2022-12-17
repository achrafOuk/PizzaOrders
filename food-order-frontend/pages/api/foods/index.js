import { routes } from "../../../routes";

export default async (req,res)=>{
    if ( req.method === 'GET' )
    {
        let requestOptions = {
            method: 'GET',
        };
        let current_page = req.query?.page ?? 1;
        let foods = await fetch(`${routes.FOODS}?page=${current_page}`, requestOptions)
        foods = await foods.json();
        console.log('order status:',foods);
        return res.status(200).json({ response: foods });
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`
        });
    }
}