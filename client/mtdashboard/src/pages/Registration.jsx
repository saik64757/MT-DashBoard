import React, { useState } from "react";
import { config } from "../App";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleRadio(e) {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let user = await axios.post(
        `${config.endpoint}users/register/${userDetails.usertype}`,
        userDetails
      );
      if (user.status === 201) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Sign up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4" onChange={handleChange}>
              <div>
                <label className="block" htmlFor="userName">
                  User Name
                </label>
                <input
                  name="userName"
                  type="text"
                  placeholder="User Name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block" htmlFor="address">
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4 mb-5">
                <label className="block">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <div className="flex items-center mb-4">
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
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Registration;
