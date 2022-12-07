import { serialize } from "cookie";
import { routes } from "../../routes";

export default async (req,res)=>{
    if (req.method === 'POST')
    {
        const {name,password } = req.body;
        if( name ==='' || password ==='')
        {
            return res.status(500).json({ success: `you cannot leave any field empty` ,status:500});
        }
        const body = req.body;
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
        "name": name,
        "password": password
        });
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        let login_fetcher = await fetch(`${routes.LOGIN}`, requestOptions)
            .then(response => response.json())
            .catch(error => error);
        console.log('login fetcher',login_fetcher?.response)
        if( login_fetcher?.response === undefined )
        {
            return res.status(500).json({
                success: 'credentials are wrong',
                status:500
            });
        }
        let httpOnlyCookie = serialize(
            'access_token', login_fetcher?.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 3,
                sameSite: 'strict',
                path: '/'
            }
        )
        res.setHeader('set-Cookie', httpOnlyCookie);
        return res.status(200).json({
            username:login_fetcher?.username,
            success: 'logged in successfully',
            status:200
        });
    }
    else{
        return res.status(500).json({
            success: `method ${req.method} is not supported`,
            status:500
        });
    }
}