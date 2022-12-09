import { cookie } from "cookie";
import { routes } from "../../routes";
export default async (req,res)=>{
    let {cookies} = req;
    console.log('cookies:',cookies)
    if (req.method === 'POST' )
    {
        if( cookie!==undefined)
        {
          return res.status(500).json({ error: 'you cannot logout' });
        }
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${cookies?.access_token}`);
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };
        let logout = await fetch(`${routes.LOGOUT}`, requestOptions)
            .then(response => response.json())
            .catch(error => error);
        if (logout?.status !== 200)
        {
          return res.status(404).json({
            error: 'something went wrong'
          });
        }
        req.setHeader('set-Cookie',[
            cookie.serialize(
                'access_token', null, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 30,
                    sameSite: 'strict',
                    path: '/'
                }
            ),
        ]);
        return res.status(200).json({
            success: 'logged out successfully'
        });
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`
        });
    }
}
