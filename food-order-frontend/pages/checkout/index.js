import Link from 'next/link'
import Seo from '../../components/shared/seo'
import {  useSelector } from "react-redux";
const ThanksPage = () => {
 let order_id = useSelector((state) => state?.reducers.order?.order?.order_id);
 console.log('order id',order_id)
  return (
    <>
        <Seo title ='thank you for your order'></Seo>
        <div className="bg-white text-black flex flex-col items-center text-center p-6">
            <h1 className="text-2xl font-bold text-blue-600">Thank you for your order!</h1>
            <p className="text-lg m-4">Your food will be delivered to your doorstep in the estimated time. Bon appétit</p>
            <div className='flex'>
                <Link href='/' >
                    < a href='' className=" text-white px-4 py-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                        Continue Shopping
                    </a>
                </Link>
                <Link href={`/fellow-order/${order_id}`} >
                    < a href='' className=" text-white px-4 py-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                        fellow your order status
                    </a>
                </Link>

            </div>
        </div>
    </>
  )
}

export default ThanksPage
