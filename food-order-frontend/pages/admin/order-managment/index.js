import AdminNavbar from "../../../components/dashboard/navbar";
import AdminSidebar from "../../../components/dashboard/sidebar";
import AdminTable from "../../../components/dashboard/table";
import { useEffect, useState } from "react";
import Pagination from "../../../components/pagination/pagination";
import { routes } from "../../../routes";
import OrderTable from "../../../components/dashboard/OrderTable";
import { useRouter } from "next/router";
import { useSelector} from "react-redux";
export default function food_mangment({ orders, pages_counter }) {
  let router = useRouter();
  let page = router.query["page"] ?? 1;
  let [currentPage, setCurrentPage] = useState(parseInt(page));
  let [PageCounter, setPageCounter] = useState();
  let [Orders, setOrders] = useState(orders);
  console.log('pages counter::::',pages_counter);
  console.log('pages number',PageCounter);
  const user_token = useSelector( (state) => state?.reducers.order?.login.token);
  async function fetch_orders() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user_token}`);
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let res = await fetch(`${routes.ORDER}?page=${currentPage}`,requestOptions);
    res = await res.json();
    console.log('orders:',res);
    let orders = res?.data;
    setOrders(orders);
    setPageCounter(res?.last_page)
    console.log('orders:',PageCounter);
  }
  useEffect(() => {
    async () => {
      fetch_orders();
    };
  }, []);

  useEffect(() => {
    fetch_orders();
  }, [currentPage]);
  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <main className="h-full overflow-y-auto">
          <OrderTable
            orders={Orders}
            currentPage={currentPage}
          />
          <Pagination
            PageNumbers={PageCounter}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            url={`/admin/order-managment?page=`}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}
