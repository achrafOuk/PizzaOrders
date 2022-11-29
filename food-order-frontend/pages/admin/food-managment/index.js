import AdminNavbar from "../../../components/dashboard/navbar";
import AdminSidebar from "../../../components/dashboard/sidebar";
import AdminTable from "../../../components/dashboard/table";
import { useEffect, useState} from "react";
import Pagination from "../../../components/pagination/pagination";
import { routes } from "../../../routes";
import { useRouter } from "next/router";
export default function food_mangment({ pizzaList, pages_counter }) {
  let router = useRouter();
  let page = router.query["page"] ?? 1;
  let [currentPage, setCurrentPage] = useState(parseInt(page));
  console.log('page counter from start',pages_counter);
  let [PizzaList, setPizzaList] = useState(pizzaList);
  let [PagesCounter, setPageCounter] = useState(pages_counter);
  useEffect(() => {
    let current_page = async () => {
      setCurrentPage(page)
      console.log('current page',page,currentPage,pages_counter)
    };
    current_page();
  }, [page]);

  useEffect(() => {
    let fetch_counter = async () => {
      if( PizzaList.length === 0 )
      {
        if ( pages_counter !==1 )
        {
          pages_counter-=pages_counter;
        }
        currentPage = currentPage !== 1 ? currentPage-1 : currentPage;
        setPageCounter((current)=>current-1);
        router.push(`/admin/food-managment?page=${currentPage}`)
        console.log('page counter',pages_counter);
      }
    };
    fetch_counter();
  }, [PizzaList]);

  useEffect(()=>{
    const fetch_pizzas = async ()=>{
      let requestOptions = {
        method: "GET",
      };
      let res = await fetch(`${routes.FOODS}?page=${currentPage}`, requestOptions);
      let response = await res.json();
      setPizzaList(response.response.data)
      pages_counter = response.response.last_page
    }
    fetch_pizzas();
  },[currentPage])
  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <main className="h-full overflow-y-auto">
          <AdminTable pizzaList={PizzaList} setPizzaList={setPizzaList}></AdminTable>
          <Pagination
            PageNumbers={PagesCounter}
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
  let requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${routes.FOODS}?page=${current_page}`, requestOptions);
  let response = await res.json();
  let pizzaList = response.response.data;
  let pages_counter = response.response.last_page;
  const req = context.req;
  return {
    props: {
      pizzaList,
      pages_counter,
    },
  };
}
