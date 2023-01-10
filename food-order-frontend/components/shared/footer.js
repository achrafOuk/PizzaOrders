import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Footer() {
    const router = useRouter();
    const currentRoute = router.pathname;
    let split_currentroute = currentRoute.split('/')
    let isAdminPanel = split_currentroute.length>1 && split_currentroute[1]==='admin' ;
    
    return (
    <footer className='mt-[5%]'>
    { !isAdminPanel ?
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
  </div> : null}

      <div className="text-white bg-blue-600 py-4 flex justify-center font-primary items-center">
        Created by
        <a
          href="#"
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

export default Footer;
