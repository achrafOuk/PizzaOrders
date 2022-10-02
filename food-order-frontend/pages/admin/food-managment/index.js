import AdminNavbar from "../../../components/dashboard/navbar";
import AdminSidebar from "../../../components/dashboard/sidebar";
import AdminTable from "../../../components/dashboard/table";
export default function food_mangment({ pizzaList }) {
  return (
    <div className="flex h-screen bg-gray-50 ">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col flex-1 w-full">
        <AdminSidebar></AdminSidebar>
        <main className="h-full overflow-y-auto">
          <AdminTable pizzaList={pizzaList}></AdminTable>
        </main>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("http://localhost:8000/api/foods/");
  console.log(res);
  const pizzaList = await res.json();
  // Pass data to the page via props
  return {
    props: {
      pizzaList,
    },
  };
}
