import Link from "next/link";
import AdminLink from "./AdminLink";

export default function AdminNavbar() {
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white text-black md:block flex-shrink-0">
      <div className="py-4 text-gray-500 ">
        <a className="ml-6 text-lg font-bold text-gray-800 " href="#">
          FoodApp dashboard
        </a>
        <ul className="mt-6">
          <AdminLink text="Dashboard" link="/admin"></AdminLink>
          <AdminLink
            text="Food managment"
            link="/admin/food-managment"
          ></AdminLink>
          <AdminLink text="Order managment" link="/"></AdminLink>
        </ul>
        <ul></ul>
      </div>
    </aside>
  );
}
