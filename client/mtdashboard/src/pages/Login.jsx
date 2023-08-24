import axios from "axios";
import React, { useState } from "react";
import { config } from "../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userdetails, setUserdetails] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserdetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  function handleRadio(e) {
    setUserdetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let user = await axios.post(
        `${config.endpoint}users/login/${userdetails.usertype}`,
        userdetails
      );
      console.log(user);
      if (user.status === 200) {
        toast.success("User Login Successfully");
      }
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4" onChange={handleChange}>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <div className="flex items-center mb-4 mt-4">
                  <input
                    onChange={handleRadio}
                    required
                    type="radio"
                    name="usertype"
                    value="manufacturer"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Manufacturer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    required
                    onChange={handleRadio}
                    type="radio"
                    name="usertype"
                    value="transporter"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Transporter
                  </label>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
