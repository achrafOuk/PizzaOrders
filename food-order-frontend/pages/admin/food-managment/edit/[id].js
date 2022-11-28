import { useRouter } from "next/router";
import { useState } from "react";
import AdminNavbar from "../../../../components/dashboard/navbar";
import AdminSidebar from "../../../../components/dashboard/sidebar";
import { routes } from "../../../../routes";
export default function FoodElement({ pizza }) {
  console.log("price:", pizza.food_price);
  let [price, usePrie] = useState(pizza.food_price);
  let [name, useName] = useState(pizza.food_name);
  let [description, useDescription] = useState(pizza.food_description);
  let route = useRouter();
  let id = route.query["id"];
  const [selectedImage, setSelectedImage] = useState(
    `${routes.IMAGE}/${pizza.food_image}`
  );
  console.log(`${routes.IMAGE}/${selectedImage}`);
  function setPrice(price) {
    price = parseFloat(price);
    return !isNaN(price) ? price : parseFloat(1);
  }
  async function edit_element(event) {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append("food_name", name);
    formdata.append("food_price", price);
    formdata.append("food_description", description);
    console.log(
      selectedImage,
      selectedImage !== `${routes.IMAGE}/${pizza.food_image}`
    );
    if (typeof selectedImage === "object") {
      console.log(selectedImage);
      console.log(typeof selectedImage);
      formdata.append(
        "food_image",
        selectedImage,
        "/C:/Users/user/Documents/pizza.png"
      );
    }
    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    await fetch(`${routes.UPDATE_FOOD}/${id}`, requestOptions)
      .then((res) => {
        route.push("/admin/food-managment/");
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <form
          onSubmit={(event) => edit_element(event)}
          className="mt-[5%] h-full pb-16 overflow-y-auto"
        >
          <div className="container px-6 mx-auto grid">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Image
              </label>
              {selectedImage && typeof selectedImage === "string" && (
                <div>
                  <img
                    className="w-full"
                    alt="not fount"
                    width={"250px"}
                    src={selectedImage}
                  />
                  <br />
                </div>
              )}
              {selectedImage && typeof selectedImage !== "string" && (
                <div>
                  <img
                    className="w-full"
                    alt="not fount"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                </div>
              )}

              <input
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  useName(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Price
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                value={price}
                onChange={(e) => {
                  usePrie(setPrice(e.target.value));
                }}
                min="1"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Description
              </label>
              <textarea
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  useDescription(e.target.value);
                }}
                defaultValue={description}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  // Fetch data from external API
  let pizza_id = context.params.id;
  const res = await fetch(`http://localhost:8000/api/foods/${pizza_id}`);
  const pizza = await res.json();
  // Pass data to the page via props
  return {
    props: {
      pizza,
    },
  };
}
