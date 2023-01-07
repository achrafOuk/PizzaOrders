import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import ButtonWrapper from "./ButtonWrapper";

// This values are the props in the UI
const amount = "2";
const currency = "USD";

// sb-3n47kn24607455@personal.example.com
// &r.vL16O
// Custom component to wrap the PayPalButtons and handle currency changes
export default function PaypalButtons({ customerData,isDisabled}) {
    let options = {
        "client-id": "test",
        components: "buttons",
        currency: "USD",
        "disable-funding": "card",
    };
	return (
		<div >
            <PayPalScriptProvider options={options}>
				<ButtonWrapper currency={currency} showSpinner={false} isDisabled={isDisabled} customerData={customerData}/>
			</PayPalScriptProvider>
		</div>
	);
}