import Link from "next/link";
export default function next(currentPage, url) {
  return (
    <li>
      <Link href={`${url}`}>
        <a
          className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 :bg-gray-800 "
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </a>
      </Link>
    </li>
  );
}
