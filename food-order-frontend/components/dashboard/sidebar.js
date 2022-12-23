import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../../hooks/login/useLogout";
import { setLogout } from "../../redux/slices/loginSlice";

export default function AdminSidebar() {
  const username = useSelector( (state) => state?.reducers.order?.login.username );
  let [isUserDropDownShowed,setUserDropDownShowed] = useState(false);
  let router = useRouter();
  let distach = useDispatch();
  return (
    <header className="z-10 py-4 bg-white shadow-md bg-blue-600">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-white ">
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-blue-500">
            <div className="absolute inset-y-0 flex items-center pl-2"></div>
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Toggle color mode"
            >
            </button>
          </li>
          <li className="relative">
            <button
              className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
              aria-haspopup="true"
            onClick={()=> setUserDropDownShowed((current_state)=> !current_state )}
            >
              {username}
            </button>
        { isUserDropDownShowed ?
          <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md " aria-label="submenu"> <li className="flex"> <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 " href="#">
            <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            <span onClick={async ()=>{
              console.log('on click');
              let result = await fetch('/api/logout/');
              if ( result.status === 200 )
              {
                distach(setLogout());
                router.push('/')
              }
               }}>Log out</span>
          </a>
        </li>
      </ul>
      : null}
      </li>
      </ul>
    </div>
  </header>
  );
}
