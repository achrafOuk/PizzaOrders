import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar/Navbar";
import store from "../redux/store";
import {wrapper} from "../redux/store";
import { persistor } from "../redux/store";
import { Provider, useSelector, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "../components/shared/footer";
function MyApp({ Component, pageProps }) {
  //let {new_store,props} = wrapper.useWrappedStore(pageProps);
  let store = useStore((state)=>state);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store._persistor}>
          <div className="flex flex-col justify-between min-h-screen">
            <Navbar></Navbar>
            <Component {...pageProps} />
            <Footer></Footer>
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

//export default MyApp;
export default wrapper.withRedux(MyApp);