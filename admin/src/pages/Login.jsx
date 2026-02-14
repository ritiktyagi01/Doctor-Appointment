import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        // by using fetch api

        // const response = await fetch(`${backendUrl}/admin/login`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        //   }),
        // });
        // const data = await response.json();
        // setToken(data.token);
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
 <><form
        onSubmit={onSubmitHandler}
        className="flex items-center  min-h-[80vh]"
      >
        <div
          className="flex flex-col gap-3 m-auto items-start p-8 min-w-75 sm:min-w-85
                      border border-gray-100 text-zinc-600 text-sm rounded-lg shadow-lg"
        >
          <h1 className="text-2xl m-auto font-medium ">
            <span className="text-primary">{state} </span>Login
          </h1>
          <div className="w-full">
            <h1 className=" mb-2">Email</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] w-full p-2 mt-1 rounded"
              type="email"
              required
            />
          </div>

          <div className="w-full">
            <h1 className=" mb-2 items-enter">Passowrd</h1>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] w-full p-2 mt-1 rounded"
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg h-10
                       hover:opacity-90 transition-all duration-500 cursor-pointer text-base"
          >
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor login?
              <span
                onClick={() => {
                  setState("Doctor");
                }}
                className="text-primary cursor-pointer underline "
              >
                Click here!
              </span>
            </p>
          ) : (
            <p>
              Admin login?
              <span
                onClick={() => {
                  setState("Admin");
                }}
                className="text-primary cursor-pointer underline"
              >
                Click here!
              </span>
            </p>
          )}
        </div>
        <hr />
      </form>
 </>
     
      
    
  );
};

export default Login;
