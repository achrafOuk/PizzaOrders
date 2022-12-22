import { routes } from "../../../routes";
import formidable from 'formidable';
import axios from "axios";
let FormData = require('form-data');
let fs = require('fs');
// config api to use formidable for data parsing
export const config = {
  api: {
    bodyParser: false
  }
};
async function saveFormData(user_token,fields, files) {
  // some images are printed here, some other no. 'data',data);
    let data = new FormData();
    data.append('food_name', fields.food_name);
    data.append('food_price', fields.food_price);
    data.append('food_description', fields.food_description);
    data.append('food_image', fs.createReadStream(files.food_image?.filepath));
    let config = {
        method: 'post',
        url: `${routes.ADD_FOOD}`,
        headers: { 'Authorization': `Bearer ${user_token}`, ...data.getHeaders() },
        data : data
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
    let response = await result.json()
    console.log('response:',response?.status)
    console.log('add food result',response?.status)
    return response?.status;
}
export default async (req,res)=>{

    if ( req.method === 'POST' )
    {
        let user_token = req?.cookies?.access_token;
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
                let food_add_response_status = await saveFormData(user_token,fields, files);
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