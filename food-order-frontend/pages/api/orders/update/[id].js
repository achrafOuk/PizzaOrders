import { serialize } from "cookie";
import { routes } from "../../../../routes";
export default async (req,res)=>{
    let cookies = req?.cookies?.access_token;
    let { id } = req.query;
    id = parseInt(id);
    if ( req.method === 'POST' )
    {
        if( cookies===undefined || cookies===null )
        {
            req.setHeader('set-Cookie',[
                serialize(
                    'access_token', null, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        path: '/'
                    }
                ),
            ]);

            return res.status(500).json({ error: 'you are unauthorized',status:500 });
        }
        if ( isNaN(id) )
        {
            return res.status(404).json({ data: `id is not a number`,status:404 });
        }
        
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${cookies}`);
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        let orders = await fetch(`${routes.NEXT_ORDER_STATUS}/${id}`, requestOptions)
        let order_status =orders?.status; 
        console.log('order status:',order_status);
        console.log('order status:',order_status, typeof(order_status) );
        if ( order_status !== 200 && order_status !== 400 )
        {
            return res.status(404).json({ error: 'something went wrong' });
        }
        orders = await orders.json();
        console.log('order status:',orders);
        return res.status(order_status).json({ message: orders.response });
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`
        });
    }
}