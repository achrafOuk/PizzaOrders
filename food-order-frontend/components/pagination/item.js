import Link from "next/link";
export default function Item({ page, currentPage, url, setPage, lastPage }) {
  //page = parseInt(page);
  console.log(page,currentPage,lastPage)
  console.log('--------------------------')
   page = ( page !== 'next' && page !== 'preview') ? parseInt(page): page;
   currentPage = parseInt(currentPage);
  if (page === currentPage) {
    return (
      <li>
        <a
          className="bg-purple-600 text-white py-2 px-3 leading-tight bg-white border border-gray-300"
          style={{ cursor: "default" }}
        >
          {page}
        </a>
      </li>
    );
  }
  if (page === "preview" && currentPage === 1) {
    return (
      <li>
        <a
          className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 :bg-gray-800"
          style={{ cursor: "default" }}
        >
          {page}
        </a>
      </li>
    );
  }
  if (page === "next" && lastPage === currentPage) {
    return (
      <li>
        <a
          className="bg-white py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100"
          style={{ cursor: "default" }}
        >
          {page}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={`${url}`}>
        <a
          className="bg-white py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100"
          onClick={() => {
            setPage();
          }}
        >
          {page}
        </a>
      </Link>
    </li>
  );
}
