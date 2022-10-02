import Link from "next/link";
export default function FoodCart({ id, title, price, description, image }) {
  return (
    <>
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
        <img
          className="rounded-t-lg"
          src="https://github.com/safak/youtube/blob/next-food-ordering-app/public/img/pizza.png?raw=true"
          alt=""
        />
        <div className="p-5">
          <Link href={`/pizza/${id}`}>
            <a href="">{title}</a>
          </Link>
          <p>${price}</p>
          <p className="mb-3 font-normal text-gray-700 ">{description}</p>
        </div>
      </div>
    </>
  );
}
