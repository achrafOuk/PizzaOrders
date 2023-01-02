import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
export default function PaypalButton (){

{/*<PayPalScriptProvider options={{}}>*/}
  const total = useSelector((state) => state?.reducers.order?.order?.total);
  const currency = 'USD';
  let paypal_key = 'ATFBxUMhwLq18ggX-586Mp_GVp7eqTwzZcZa0w3fzI87TJTNFSSKfoip68SHNuwV7KlTFQYCh4c09bj7'
const client = { 'client-id': paypal_key, };
  const onSuccess = () =>{ console.log('the request is done'); }
  const onError = () =>{ console.log('something went wrong'); }
  const onCancel = () =>{ console.log('request cancled'); }
  console.log('log',typeof(total));
  return (
    <PayPalScriptProvider options={{ "client-id":paypal_key,currency: "USD" }}>
        <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  )
}