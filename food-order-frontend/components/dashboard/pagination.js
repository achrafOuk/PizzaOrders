export default function Pagination() {
  return (
    <nav aria-label="Table navigation">
      <ul className="inline-flex items-center">
        <li>
          <button
            className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
            aria-label="Previous"
          >
            <svg
              className="w-4 h-4 fill-current"
              aria-hidden="true"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
            1
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
            2
          </button>
        </li>
        <li>
          <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
            3
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
            4
          </button>
        </li>
        <li>
          <span className="px-3 py-1">...</span>
        </li>
        <li>
          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
            8
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
            9
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
            aria-label="Next"
          >
            <svg
              className="w-4 h-4 fill-current"
              aria-hidden="true"
              viewBox="0 0 20 20"
            >
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
