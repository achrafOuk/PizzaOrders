import { useSelector, useDispatch } from "react-redux";
export default function FoodTotal() {
  const total = useSelector((state) => state?.reducers.order?.order?.total);
  console.log("total:", total);
  return (
    <tr className="text-center">
      <td></td>
      <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
        total
      </td>
      <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
        $<span className="text-xl">{total}</span>
      </td>
      <td></td>
    </tr>
  );
}
