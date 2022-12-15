import { useSelector, useDispatch } from "react-redux";
import FoodItems from "../../components/cart/FoodItems";
import FoodTotal from "../../components/cart/FoodTotal";
import Button from "../../components/shared/button";
import { clear } from "../../redux/slices/orderSlice";
export default function cart() {
  //const counter = useSelector((state) => state?.counter?.value);
  const order = useSelector((state) => state?.reducers.order?.order?.order);
  const dispatch = useDispatch();
  console.log("order:", order);
  return (
    <main>
      <div className="mt-[5%] container mx-auto mb-20">
        <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
          Your Cart
        </h1>
        <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
          <table className="mx-auto">
            <thead>
              <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                <th className="font-primary font-normal px-6 py-4">Product</th>
                <th className="font-primary font-normal px-6 py-4">Quantity</th>
                <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                  Price
                </th>
                <th className="font-primary font-normal px-6 py-4">Total</th>
                <th className="font-primary font-normal px-6 py-4">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-palette-lighter">
              {order && order.length ? (
                <FoodItems products={order}></FoodItems>
              ) : (
                <tr className="text-sm sm:text-base text-gray-600 text-center">
                  <td colSpan="5" className="p-[5%]">
                    The cart is empty
                  </td>
                </tr>
              )}
              <FoodTotal></FoodTotal>
            </tbody>
          </table>
        </div>
        <div className="max-w-sm mx-auto space-y-4 px-2">
          <Button
            buttonText="Clear"
            buttonClass="bg-white text-black border border-indigo-599 text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
            onClick={() => dispatch(clear())}
          ></Button>

          <Button
            buttonText="Check Out"
            buttonClass="bg-blue-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
          ></Button>
        </div>
      </div>
    </main>
  );
}
