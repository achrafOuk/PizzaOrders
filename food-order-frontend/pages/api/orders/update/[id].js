import { serialize } from "cookie";
import { routes } from "../../../../routes";
export default async (req,res)=>{
    let {cookies} = req;
    let { id } = req.query
    id = parseInt(id);
    if ( req.method === 'POST' )
    {
        if ( isNaN(id) )
        {
            return res.status(404).json({ data: `id is not a number`,status:404 });
        }
        if( cookies===undefined )
        {
            return res.status(500).json({ error: 'you are unauthorized',status:500 });
        }
        if( cookies!==undefined )
        {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookies?.access_token}`);
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };
            let orders = await fetch(`${routes.NEXT_ORDER_STATUS}/${pid}`, requestOptions)
            .then(response => response.json())
            .catch(error => error);
            if (orders?.status !== 200)
            {
            return res.status(403).json({ error: 'something went wrong' });
            }
        }
        else{
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
        }
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`
        });
    }
}