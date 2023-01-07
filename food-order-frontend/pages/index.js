import Head from "next/head";
import FoodList from "../components/food/FoodList";
import Pagination from "../components/pagination/pagination";
import Seo from "../components/shared/seo";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Carousal from "../components/shared/carousal";
export default function Home({ pizzaList, pages_counter }) {
  let router = useRouter();
  let page = router.query["page"] ?? 1;
  let [currentPage, setCurrentPage] = useState(parseInt(page));

  return (
    <>
      <Seo></Seo>
      <Carousal></Carousal>
      <div className={styles.container}>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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
  const host = context.req.headers.host
  let res = await fetch(`http://${host}/api/foods?page=${current_page}`, requestOptions);
  let response = await res.json();
  response = response.response;
  console.log('response::',response);
  let pizzaList = response.response.data;
  let pages_counter = response.response.last_page;
  return {
    props: {
      pizzaList,
      pages_counter,
    },
  };
}
