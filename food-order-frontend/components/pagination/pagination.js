import Link from "next/link";
import { useState } from "react";

export default function Pagination({
  PageNumbers,
  currentPage,
  setCurrentPage,
  url,
}) {
  let pagination = Array.from(Array(PageNumbers).keys());
  console.log(`url:${url}`);
  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="bg-white inline-flex -space-x-px">
        <li>
          <Link href={`${url}`}>
            <a
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 :bg-gray-800 "
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </a>
          </Link>
        </li>
        {pagination.map((number) => (
          <li key={number}>
            <Link href={`${url}`}>
              <a
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => {
                  setCurrentPage(number + 1);
                }}
              >
                {number + 1}
              </a>
            </Link>
          </li>
        ))}
        <li>
          <Link href={`${url}`}>
            <a
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 :bg-gray-800 "
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
