import {  useSelector } from "react-redux";
export function middleware(req,res)
{
  //const user_token = useSelector( (state) => state?.reducers.order?.login.token);
  let {cookies}= req;
  console.log('cookies:',cookies);
  console.log('***********')
}