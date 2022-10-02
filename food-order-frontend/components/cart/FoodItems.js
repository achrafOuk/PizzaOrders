import FoodItem from "./FoodItem";

export default function FoodItems({ products }) {
  console.log("the food", products);
  return (
    <>
      {products.map((product) => (
        <FoodItem product={product}></FoodItem>
      ))}
    </>
  );
}
