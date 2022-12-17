import { routes } from "../../../routes";
import formidable from 'formidable';
// config api to use formidable for data parsing
export const config = {
  api: {
    bodyParser: false
  }
};
async function saveFormData(user_token,fields, files) {
  // some images are printed here, some other no. 'data',data);
    console.log('data')
    let Headers = {
        "Authorization": `Bearer ${user_token}`,
        "Content-Type": "application/json",
    }
    let data = {
        food_name: fields.food_name,
        food_pirce: fields.food_price,
        food_description: fields.food_description,
        food_image: files.food_image,
    };
    console.log('data',data);
    let requestOptions = { method: "POST", body: data, headers:Headers, };
    console.log('fetching.....')
    let response_data = await fetch(routes.ADD_FOOD, requestOptions)
    .then(data=>data)
    .catch(err=>{console.log('error:',err)})
    console.log(response_data)
    console.log(response_data?.status)
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
        /*try{
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
        }*/
    }
    else{
        return res.status(500).json({ success: `method ${req.method} is not supported` });
    }
}