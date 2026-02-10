import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleState = () => {
    setState(prev => (prev === "login" ? "signUp" : "login"));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log({ name, email, password, state });
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex items-center min-h-[80vh]">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[320px] sm:min-w-95
                      border border-gray-100 text-zinc-600 text-sm rounded-lg shadow-lg">

        <p className="text-xl font-bold">
          {state === "login" ? "Login" : "Create Account"}
        </p>

        <p>
          Please {state === "login" ? "log in" : "sign up"} to book appointment
        </p>

        <div className="flex flex-col gap-3 w-full">

          {/* Full name only for signup */}
          {state === "signUp" && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Full Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 px-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 px-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg h-10
                       hover:opacity-90 transition-all"
          >
            {state === "login" ? "Login" : "Create Account"}
          </button>

          <p className="text-center">
            {state === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleState}
              className="text-primary font-medium"
            >
              {state === "login" ? "Sign up" : "Login"}
            </button>
          </p>

        </div>
      </div>
    </form>
  );
};

export default Login;
