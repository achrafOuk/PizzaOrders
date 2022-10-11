import Link from "next/link";
import { useState } from "react";
import Item from "./item";

export default function Pagination({
  PageNumbers,
  currentPage,
  setCurrentPage,
  url,
}) {
  let pagination = Array.from(Array(PageNumbers).keys());
  console.log(`url:${url}`);
  //className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="bg-white inline-flex -space-x-px">
        <Item
          page={"preview"}
          url={`${url}`}
          setPage={() => {
            setCurrentPage(currentPage - 1);
          }}
          currentPage={currentPage}
        ></Item>
        {pagination.map((number) => (
          <Item
            url={`${url}`}
            setPage={() => {
              setCurrentPage(number + 1);
            }}
            page={number + 1}
            key={number}
          ></Item>
        ))}
        <Item
          page={"next"}
          url={`${url}`}
          setPage={() => {
            setCurrentPage(currentPage + 1);
          }}
          lastPage={PageNumbers}
        ></Item>
      </ul>
    </nav>
  );
}
