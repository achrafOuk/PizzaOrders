import Button from "../shared/button";

export default function FoodInfo({ pizza }) {
  return (
    <div className=" font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
        {pizza.food_name}
      </h1>
      <div className="text-xl text-palette-primary font-medium py-4 px-1">
        <span className="text-2xl">${pizza.food_price}</span>
      </div>
      <p className="font-medium text-lg">{pizza.food_description}</p>
      <div className="text-xl text-palette-primary font-medium py-4 px-1"></div>
    </div>
  );
}
