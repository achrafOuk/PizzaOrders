import AdminNavbar from "../../../components/dashboard/navbar";
import AdminSidebar from "../../../components/dashboard/sidebar";
import AdminTable from "../../../components/dashboard/table";
import { useEffect, useState } from "react";
import Pagination from "../../../components/pagination/pagination";
import { routes } from "../../../routes";
import OrderTable from "../../../components/dashboard/OrderTable";
import { useRouter } from "next/router";
export default function food_mangment({ orders, pages_counter }) {
  let router = useRouter();
  let page = router.query["page"] ?? 1;
  let [currentPage, setCurrentPage] = useState(parseInt(page));
  let [Orders, setOrders] = useState(orders);
  useEffect(() => {
    console.log("current page:");
  }, [orders]);
  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <main className="h-full overflow-y-auto">
          <OrderTable
            orders={Orders}
            setOrders={setOrders}
            currentPage={currentPage}
          />
          <Pagination
            PageNumbers={pages_counter}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            url={`/admin/order-managment?page=`}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  let current_page = context.query?.page ?? 1;
  let res = await fetch(`${routes.ORDER}?page=${current_page}`);
  res = await res.json();
  let orders = res?.data;
  let pages_counter = res?.last_page;
  return {
    props: {
      orders,
      pages_counter,
    },
  };
}
