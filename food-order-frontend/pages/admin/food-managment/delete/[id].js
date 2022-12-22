import formidable from 'formidable';
import axios from "axios";
import { routes } from '../../../../routes';
let FormData = require('form-data');
async function saveFormData(user_token,food_id) {
  // some images are printed here, some other no. 'data',data);
    let config = {
        method: 'post',
        url: `${routes.DELETE_FOOD}/${food_id}`,
        headers: { 'Authorization': `Bearer ${user_token}` },
    };
    let response_data = await axios(config)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log('error:',error);
        return error
    });
    return response_data?.status ?? 400;
    }
export default async (req,res)=>{

    if ( req.method === 'POST' )
    {
        let user_token = req?.cookies?.access_token;
        let food_id = req.query.id;
        if( food_id === undefined)
        {
            return res.status(400).json({ error: 'you need to add food id',status:400 });
        }
        if( user_token===undefined || user_token===null )
        {
            return res.status(500).json({ error: 'you are unauthorized',status:500 });
        }
        const form = new formidable.IncomingForm({ multiples: true });
        const formData = new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log("err", err);
                reject("error");
            }
            resolve({ fields, files });
            });
        });
        try {
            const { fields, files } = await formData;
            try {
                let food_add_response_status = await saveFormData(user_token,food_id);
                if ( food_add_response_status === 200)
                {
                    return res.status(food_add_response_status).send({ status: "submitted" });
                }
                return res.status(400).send({ status: "something went wrong" });
            } catch (e) {
                console.log(e);
                res.status(400).send({ status: "something went wrong" });
            return;
            }
        } 
        catch (e) {
            res.status(400).send({ status: "invalid submission" });
            return;
        }
    }
    else{
        return res.status(500).json({ success: `method ${req.method} is not supported` });
    }
}
