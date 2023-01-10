import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar/Navbar";
import store from "../redux/store";
import { persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "../components/shared/footer";
import Seo from "../components/shared/seo";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
const router = useRouter();
console.log('current pathname:',router.pathname);
let currentRoute = router.pathname;
let split_currentroute = currentRoute.split('/');
let isAdminPanel = split_currentroute.length>1 && split_currentroute[1]==='admin' ;
console.log('is admin panel',isAdminPanel)
  return (
    <>
    <Seo></Seo>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="bg-gray-50 flex flex-col ">
            <Navbar></Navbar>
            <Component {...pageProps} />
            <Footer></Footer>
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;