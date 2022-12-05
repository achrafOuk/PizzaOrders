import Head from "next/head";
import FoodList from "../components/food/FoodList";
import Pagination from "../components/pagination/pagination";
import Seo from "../components/shared/seo";
import { routes } from "../routes";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
export default function Home({ pizzaList, pages_counter }) {
  console.log('home')
  let router = useRouter();
  let page = router.query["page"] ?? 1;
  let [currentPage, setCurrentPage] = useState(parseInt(page));

  return (
    <>
      <Seo title="FoodOrderAPP"></Seo>
      <div className={styles.container}>
        <div className="mt-[5%] p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          <FoodList FoodList={pizzaList}></FoodList>
        </div>
        <Pagination
          PageNumbers={pages_counter}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          url={`/?page=`}
        ></Pagination>
      </div>
    </>
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
