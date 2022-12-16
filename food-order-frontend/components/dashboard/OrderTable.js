import { routes } from "../../routes";
import Button from "../shared/button";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function OrderTable({ orders, currentPage ,user_token, isUserAuth}) {
  console.log(`Bearer ${user_token}`)
  const dispatch = useDispatch()
  let router = useRouter();
  async function next_stage( id, currentPage ) {
    let status = ['payment','prepayring','on the way','delivered'];
    if ( Orders === undefined ) { return;}
    let orders_clones = [...Orders];
    let order = orders_clones.filter(order=>order.id===id)[0]
    let order_id = orders_clones.indexOf( order );
    let order_status = status.indexOf( order.status );
    if ( order_id!==-1 && order_status !== status.length-1)
    {
      orders_clones[order_id].status = status[order_status+1];
    }
    setOrders(orders_clones);
    /*let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user_token}`);*/
    let requestOptions = {
      method: "POST",
      //headers: myHeaders,
    };
    await fetch(`/api/orders/update/${id}`, requestOptions);
    
  } 
  let columns = ["id", "customer name", "status", "price", "address"];
  console.log('***************************');
  console.log('orders:',orders);
  let [ Orders, setOrders ] = useState(orders);
  console.log('Orders:',Orders);
  useEffect(()=>{
    setOrders(orders)
  },[orders])
  return (
    <div className="mt-[5%] container grid px-6 mx-auto">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="bg-blue-600 text-xs font-semibold tracking-wide text-left text-white uppercase border-b ">
                {columns.map((col, id) => (
                  <th key={id} className="px-4 py-3">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {Orders?.map((order) => (
                <tr key={order.id} className="text-gray-700 ">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{order._id}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="font-semibold">{order.customer}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.status}</td>
                  <td className="px-4 py-3 text-sm">{order.total}$</td>
                  <td className="px-4 py-3 text-sm">{order.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <Button
                        buttonClass="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                        buttonText="Shows details"
                      ></Button>
                      {order.status !== "delivered" ? (
                        <Button
                          buttonClass="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                          buttonText="Next stage"
                          onClick={() => {
                            console.log(order?.id);
                            next_stage(order.id, currentPage);
                          }}
                        ></Button>
                      ) : (
                        <Button
                          buttonClass="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                          buttonText="Next stage"
                          disabled
                        ></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t  bg-gray-50 sm:grid-cols-9 ">
          <span className="flex items-center col-span-3"></span>
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            {/* <Pagination></Pagination> */}
          </span>
        </div>
      </div>
    </div>
  );
}

