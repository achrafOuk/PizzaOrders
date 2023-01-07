import { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { routes } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clear, setOrderId } from "../../redux/slices/orderSlice";

export default  function ButtonWrapper ({ customerData,currency, showSpinner,isDisabled})
 {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const order = useSelector((state) => state?.reducers.order?.order?.order);
    const Dispatch = useDispatch();
    const total = useSelector((state) => state?.reducers.order?.order?.total);
    const style = {"layout":"vertical"};
    const amount = total.toString();
    const router = useRouter();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);
    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={isDisabled}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    }).then(async (orderId) => {
                        // Your code here after create the order
                            return orderId;
                    });
                }}
                onApprove={async function (data, actions) {
                    
                    return actions.order.capture().then(async function () {
                        //router.push('/checkout');
                        let formdata = new FormData();
                        formdata.append("customer",customerData.client);
                        formdata.append("address", customerData.address);
                        formdata.append("order", JSON.stringify(order));
                        let requestOptions ={
                            method: "POST",
                            body: formdata,
                        }
                        let checkout = await fetch(`${routes.CHECKOUT}`,requestOptions);
                        console.log('checkout status request:',checkout.status);
                        console.log('checkout status request:',checkout.status===200);
                        if (checkout.status === 200)
                        {
                            let response = await checkout.json();
                            console.log('checkout is done',response)
                            let order_id = await response?.id;
                            console.log('checkout order',order_id)
                            Dispatch(setOrderId(order_id));
                            Dispatch(clear());
                            router.push('/checkout');
                            return;
                        }
                        else{
                            console.log('error');
                            return ;
                        }
                    });
                }}
            />
        </>
    );
}