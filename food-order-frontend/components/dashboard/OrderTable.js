import { routes } from "../../routes";
import Button from "../shared/button";

export default function OrderTable({ orders, setOrders, currentPage }) {
  async function next_stage(id, setOrders, currentPage) {
    let requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    await fetch(`${routes.NEXT_ORDER_STATUS}/${id}`, requestOptions);
    console.log("order status was changed");
    let orders = await fetch(`${routes.ORDER}?page=${currentPage}`);
    let res = await orders?.json();
    console.log(`new orders data:${res}`);
    setOrders(res.data);
  }
  let columns = ["id", "customer name", "status", "price", "address"];
  console.log("orders types:", typeof setOrders);
  return (
    <div className="mt-[5%] container grid px-6 mx-auto">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="bg-purple-600 text-xs font-semibold tracking-wide text-left text-white uppercase border-b ">
                {columns.map((col, id) => (
                  <th key={id} className="px-4 py-3">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {orders?.map((order) => (
                <tr key={order.id} className="text-gray-700 ">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{order._id}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="font-semibold">{order.customer}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.status}</td>
                  <td className="px-4 py-3 text-sm">{order.total}</td>
                  <td className="px-4 py-3 text-sm">{order.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <Button
                        buttonClass="bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
                        buttonText="Shows details"
                      ></Button>
                      {order.status !== "delivered" ? (
                        <Button
                          buttonClass="bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
                          buttonText="Next stage"
                          onClick={() => {
                            console.log(order?.id);
                            next_stage(order.id, setOrders, currentPage);
                          }}
                        ></Button>
                      ) : (
                        <Button
                          buttonClass="bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
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