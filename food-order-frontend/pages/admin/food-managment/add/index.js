import { useRouter } from "next/router";
import {  } from "react";
import AdminNavbar from "../../../../components/dashboard/navbar";
import AdminSidebar from "../../../../components/dashboard/sidebar";

export default function FoodElement() {
  let [name, useName] = ();
  let [price, usePrie] = ();
  let [description, useDescription] = ();
  const [selectedImage, setSelectedImage] = (null);
  let route = useRouter();
  function setPrice(price) {
    return parseFloat(price) !== NaN ? price : parseFloat(1);
  }
  async function add_element(event) {
    event.preventDefault();
    console.log(name)
    console.log(price)
    console.log(description)
    let formdata = new FormData();
    formdata.append("food_name", name);
    formdata.append("food_price", price);
    formdata.append("food_description", description);
    formdata.append( "food_image", selectedImage, "/C:/Users/user/Documents/pizza.png");
    console.log('data',formdata);
    let headers = {"Content-Type": "multipart/form-data"};
    let requestOptions = {
      method: "POST",
      body: formdata,
      //headers:headers,
    };
    let data = await fetch('/api/foods/add', requestOptions);
    let request_status = data.status;
    console.log( 'status',request_status);
    if ( request_status === 200)
    {
      route.push("/admin/food-managment/");
    }
  }
  return (
    <div className=" mb-[25%] flex h-screen bg-gray-50" >
      <AdminNavbar></AdminNavbar>
      <div className=" flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <form
          onSubmit={(event) => add_element(event)}
          className="mt-[5%] h-full pb-16 "
        >
          <div className="container px-6 mx-auto grid">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Image
              </label>
              {selectedImage && (
                <div>
                  <img
                    className="w-2/5"
                    alt="not fount"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  onClick={() => setSelectedImage(null)}>Remove</button>
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
              >
                {description}
              </textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
