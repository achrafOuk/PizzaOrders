import { useEffect, useState } from "react";
import PaypalButton from "./PaypalButton";
import { useSelector } from "react-redux";
export default function PaymentModal({showModal,setShowModal}){

const hideModalClass = "fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full";
const showModalClass = 'fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex';
let [address,setAdress] = useState('');
let [nameClient,setNameClient] = useState('');
const modelClasse = showModal ? showModalClass : hideModalClass;
const total = useSelector((state) => state?.reducers.order?.order?.total);
let isCustomerNotEmpty = ( address!=='' && nameClient!=='' && total!==undefined);
let customerData = {
    'address':address,
    'client':nameClient,
}
return(
    /* fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex*/
    // fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full
    <div id="authentication-modal" tabIndex="-1" aria-hidden="false" className={modelClasse}>
        <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="authentication-modal" onClick={()=>setShowModal()}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only" >Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 ">Pay for your order</h3>
                    <form className="space-y-6" action="#">
                        <div>
                            <label htmlFor="nameCLient" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John Doe" required onChange={(e)=>{setNameClient(e.target.value)}}/>
                        </div>

                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Your address</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adress" required onChange={(e)=>{setAdress(e.target.value)}}/>
                        </div>
                        <PaypalButton isDisabled={!isCustomerNotEmpty} customerData={customerData}></PaypalButton>
                        {/*<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login to your account</button>*/}
                    </form>
                </div>
            </div>
        </div>
    </div> 

)
}