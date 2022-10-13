import AdminNavbar from "../../../components/dashboard/navbar";
import AdminSidebar from "../../../components/dashboard/sidebar";
import AdminTable from "../../../components/dashboard/table";
import { useState, useEffect, useRef } from "react";
import Pagination from "../../../components/pagination/pagination";
import { routes } from "../../../routes";
export default function food_mangment({ orders }) {
  let [currentPage, setCurrentPage] = useState(1);
  console.log("orders:", orders);
  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <main className="h-full overflow-y-auto">
          {/*<AdminTable pizzaList={pizzaList}></AdminTable>*/}
          {/*<Pagination
            PageNumbers={pages_counter}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            url={`/admin/food-managment?page=${currentPage}`}
          ></Pagination>*/}
        </main>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  let res = await fetch(`${routes.ORDER}`);
  let orders = await res.json();
  return {
    props: { orders },
  };
}
