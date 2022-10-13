import { useState } from "react";
import { useDispatch } from "react-redux";
import { remove, update } from "../../redux/slices/orderSlice";
function update_item_in_cart(dispatch, product, new_value) {
  let data = {
    order: product,
    quantity: new_value,
  };
  dispatch(update(data));
}

export default function FoodItem({ product }) {
  console.log("product:", product);
  const dispatch = useDispatch();
  let [quantity, setQuantity] = useState(product.quantity);
  return (
    <tr className="text-sm sm:text-base text-gray-600 text-center">
      <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
        <img
          src="https://github.com/safak/youtube/blob/next-food-ordering-app/public/img/pizza.png?raw=true"
          alt="fashion-dog"
          height="64"
          width="64"
          className="hidden sm:inline-flex"
        />
        <a
          className="pt-1 hover:text-palette-dark"
          href="/products/the-fashionista"
        >
          {product.name}
        </a>
      </td>
      <td className="font-primary font-medium px-4 sm:px-6 py-4">
        <input
          type="number"
          inputmMode="numeric"
          id="variant-quantity"
          name="variant-quantity"
          min="1"
          step="1"
          className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          value={quantity}
          onChange={(e) => {
            let Quantity = parseInt(e.target.value)
              ? parseInt(e.target.value)
              : 1;
            setQuantity(Quantity);
            update_item_in_cart(dispatch, product, Quantity);
          }}
        />
      </td>
      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
        $<span className="text-lg">{product.price} </span>
      </td>
      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
        $<span className="text-lg">{product.price * product.quantity}</span>
      </td>

      <td className="font-primary font-medium px-4 sm:px-6 py-4">
        <button
          aria-label="delete-item"
          className=""
          onClick={() => {
            dispatch(remove(product.id));
          }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            className="svg-inline--fa fa-times fa-w-11 w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
}
