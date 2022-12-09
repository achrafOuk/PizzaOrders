import { serialize,cookie } from "cookie";
import { routes } from "../../../routes";
export default async (req,res)=>{
    let cookies = req.headers?.access_token;
    cookies = cookies?.split('=')[1];
    if ( req.method === 'GET' )
    {
        console.log('cookie:', cookies );
        console.log('--------------------');
        if( cookies ===undefined )
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
            let orders = await fetch(`${routes.ORDER}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.log(error));
            console.log(orders)
            console.log('status',orders?.status)
            if (orders?.status !== 200)
            {
                return res.status(403).json({ error: 'something went wrong' });
            }
        }
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`
        });
    }
}