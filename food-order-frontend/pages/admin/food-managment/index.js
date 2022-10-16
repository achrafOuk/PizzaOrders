import AdminNavbar from "../../../components/dashboard/navbar";
import AdminSidebar from "../../../components/dashboard/sidebar";
import AdminTable from "../../../components/dashboard/table";
import { useState, useRef } from "react";
import Pagination from "../../../components/pagination/pagination";
import { routes } from "../../../routes";
import { useRouter } from "next/router";
export default function food_mangment({ pizzaList, pages_counter }) {
  let router = useRouter();
  let page = router.query["page"] ?? 1;
  let [currentPage, setCurrentPage] = useState(parseInt(page));

  console.log(`current page:${currentPage}`);
  console.log("--------------------------");
  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <main className="h-full overflow-y-auto">
          <AdminTable pizzaList={pizzaList}></AdminTable>
          <Pagination
            PageNumbers={pages_counter}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            url={`/admin/food-managment?page=`}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  // Fetch data from external API
  let current_page = context.query?.page ?? 1;
  console.log("current_page", context.query?.page);
  let requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${routes.FOODS}?page=${current_page}`, requestOptions);
  let response = await res.json();
  let pizzaList = response.response.data;
  let pages_counter = response.response.last_page;
  return {
    props: {
      pizzaList,
      pages_counter,
    },
  };
}
