import { useRouter } from "next/router";
import { routes } from "../../routes";
import FoodList from "../food/FoodList";
import Image from "next/image";
// loading="lazy"
export default function AdminTable({ pizzaList }) {
  let columns = ["id", "name", "price", "description"];
  console.log(pizzaList);
  let route = useRouter();
  return (
    <div className="mt-[5%] container grid px-6 mx-auto">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <button className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mb-[5%]">
          Create new food
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </button>
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
              {pizzaList?.map((pizza) => (
                <tr key={pizza.id} className="text-gray-700 ">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={`${routes.IMAGE}/${pizza.food_image}`}
                          alt=""
                          width={500}
                          height={500}
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="font-semibold">{pizza.food_name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">${pizza.food_price}</td>
                  <td className="px-4 py-3 text-sm">
                    {pizza.food_description}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        onClick={() => {
                          route.push(`/admin/food-managment/edit/${pizza.id}`);
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </button>
                      <button
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
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
