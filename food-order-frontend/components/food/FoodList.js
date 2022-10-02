import FoodCart from "./FoodCart";

export default function FoodList({ FoodList }) {
  console.log("pizza lists from component:", FoodList);
  return (
    <>
      {FoodList.map((food) => (
        <FoodCart
          key={food.id}
          id={food.id}
          price={food.food_price}
          title={food.food_name}
          description={food.food_description}
        ></FoodCart>
      ))}
    </>
  );
}
