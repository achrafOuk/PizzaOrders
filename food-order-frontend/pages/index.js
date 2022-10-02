import Head from "next/head";
import FoodList from "../components/food/FoodList";
import Seo from "../components/shared/seo";
import styles from "../styles/Home.module.css";
export default function Home({ pizzaList }) {
  console.log("pizza lists:", pizzaList);
  return (
    <>
      <Seo title="FoodOrderAPP"></Seo>
      <div className={styles.container}>
        <div className="mt-[5%] p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          <FoodList FoodList={pizzaList}></FoodList>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("http://localhost:8000/api/foods/");
  const pizzaList = await res.json();
  // Pass data to the page via props
  return {
    props: {
      pizzaList,
    },
  };
}
