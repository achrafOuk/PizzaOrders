import { serialize,cookie } from "cookie";
import { routes } from "../../../routes";
export default async (req,res)=>{
    console.log('---------------')
    //let cookies = req?.cookies?.access_token;
    let cookies = req.headers?.access_token;
    cookies = cookies?.split('=')[1];
    console.log('cookies from orders api:',cookies);
    console.log('---------------')
    let currentPage = req.query?.page ?? 1;
    if ( req.method === 'GET' )
    {
        if( cookies ===undefined || cookies===null )
        {
            res.setHeader('set-Cookie',[
                serialize(
                    'access_token', null, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        path: '/',
                    }
                ),
            ]);
            return res.status(500).json({ error: 'you are unauthorized',status:500 });
        }
        else
        {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookies}`);
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            let orders = await fetch(`${routes.ORDER}?page=${currentPage}`, requestOptions)
            console.log( orders?.status );
            if (orders?.status !== 200)
            {
                return res.status(403).json({ error: 'something went wrong' });
            }
            orders = await orders.json();
            console.log('orders from server',orders);
            return res.status(200).json({data:orders});
        }
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`
        });
    }
}