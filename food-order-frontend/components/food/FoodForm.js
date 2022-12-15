import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/slices/orderSlice";
import Button from "../shared/button";

export default function FoodForm({ id, title, price, handle, mainImg }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  async function handleAddToCart() {
    // update store context
    if (quantity !== "") {
      let product = {
        id: id,
        quantity: quantity,
        title: title,
        price: parseFloat(price),
        total: price * quantity,
        image: mainImg,
      };
      console.log(product);
      dispatch(add(product));
    }
  }

  function updateQuantity(e) {
    if (e === "") {
      setQuantity("");
    } else {
      setQuantity(Math.floor(e));
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Qty.</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="bg-white form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
          />
        </div>
      </div>
      <Button
        buttonClass="pt-3 pb-2 bg-blue-600 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex justify-center items-baseline  hover:bg-palette-dark"
        buttonText="Add to cart"
        onClick={handleAddToCart}
      ></Button>
    </div>
  );
}
