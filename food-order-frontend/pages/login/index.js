import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "../../components/shared/alert";
import Button from "../../components/shared/button";
import useLogin from "../../hooks/login/useLogin";
import { setLogin, setLogout } from "../../redux/slices/loginSlice";
export default function login() {
  let [msg, setMessage] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setLoading] = useState(false);
  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setLogout());
  },[])
  let route = useRouter();
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {msg !== "" ? (
              <Alert
                classElement="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg "
                message={msg}
              ></Alert>
            ) : (
              <></>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={async (event) => {
                event.preventDefault();
                setLoading(true);
                let user = await useLogin( event, username, password, setMessage);
                console.log('user from login page:',user);
                console.log('user from login page:',user?.status);
                if (user?.status === 200) {
                  route.push("/admin");
                  dispatch(setLogin(user));
                  //return;
                }
                setLoading(false);
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              {!isLoading ? (
                <Button
                  buttonType="submit"
                  buttonText="Sign in"
                  buttonClass="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                ></Button>
              ) : (
                <Button
                  buttonType="submit"
                  buttonText="Sign in"
                  buttonClass="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center opacity-50"
                  disabled={true}
                ></Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
