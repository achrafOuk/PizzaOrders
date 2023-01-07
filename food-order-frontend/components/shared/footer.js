import { useSelector } from "react-redux";

function div() {
  const username = useSelector(
    (state) => state?.reducers.order?.login.username
  );
  /*if (username !== "") {
    return <></>;
  }*/
  return (
    <footer>
    <div className="p-4 bg-white sm:p-6 dark:bg-gray-900">
      <div className="md:flex md:justify-between justify-center" >
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div className="w-64">
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Find about our resturant</h2>
                  <ul className="text-gray-600 dark:text-gray-400">
                      <li className="mb-4">
                          0123456789
                      </li>
                      <li>
                          1, resturant street
                      </li>
                  </ul>
              </div>
              <div className="w-64">
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Working hours</h2>
                  <ul className="text-gray-600 dark:text-gray-400">
                      <li className="mb-4">
                          Every day at 12-22
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>

      <div className="text-white bg-blue-600 py-4 flex justify-center font-primary items-center">
        Created by
        <a
          href="https://twitter.com/deepwhitman"
          target="_blank"
          rel="noreferrer"
          className="text-palette-primary font-bold px-1"
        >
          Achraf Oukouhou
        </a>
      </div>
    </footer>
  );
}

export default div;
