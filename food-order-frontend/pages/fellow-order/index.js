import React, { useState } from 'react'
import Router from 'next/router'
import Seo from '../../components/shared/seo'

const OrderStatusForm = () => {
  const [orderId, setOrderId] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    Router.push(`/fellow-order/${orderId}`)
  }
  return (
    <>
    <Seo title='fellow your order'></Seo>
    <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="space-y-4 md:space-y-6" onSubmit={e=>{handleSubmit(e)}}>
                        <h2 className="text-center">
                            <strong>Check the status of your order</strong>
                        </h2>
                    <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Order id</label>
                    <input type="text" onChange={e=>{setOrderId(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Submit</button>
                </form>
    </div>
    </div>
    </div>
    </section>
    </>
    )
}
export default OrderStatusForm;