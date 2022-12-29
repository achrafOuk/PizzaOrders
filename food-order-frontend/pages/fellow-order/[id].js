import { routes } from "../../routes";

export default function FellowOrderById(order)
{
    console.log(order)
    if (order?.order.response)
    {
        return(
            <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-center"><strong>Error:{order?.order.response}</strong></h2>
                    </div>
                </div>
            </div>
        </section>

        )
    }
    let {_id,customer,total,address,status}=order?.order; 
    return (
    <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h2 className="text-center"><strong>Get the status of your order</strong></h2>
                    <div className="text-lg font-bold mb-2">Order #{_id}</div>
                    <div className="mb-2">
                        <span className="font-bold">Customer:</span> {customer}
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Total:</span> {total}
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Address:</span> {address}
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Status:</span> {status}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch( `${routes.ORDER_STATUS}/${context.params.id}`);
  const order = await res.json();
  // Pass data to the page via props
  console.log('data:',order?.status);
  return {
    props: { order, },
  };
}
