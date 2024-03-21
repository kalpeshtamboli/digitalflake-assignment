import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Component/Button";
import OutlinedCard from "../../Component/Card";
import Input from "../../Component/InputField";
import InputField from "../../Component/InputField/InputField";
import ShowPasswordButton from "../../Component/ShowPasswordButton.jsx/ShowPasswordButton";
import { setToggle } from "../../Slice/Slice";
import ForgetPassword from "../forgetPassword";

// import image289 from "./image289.svg";
const Login = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isToggleScreen = useSelector((state) => state?.task?.screenToggle);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      setLoginResponse(data);
      

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleToggleScreen = () => {
    dispatch(setToggle(true));
  };

  return (
    <div className="relative">
      <img src="image 293.png" alt="background-image" height={"100px"} />

      <div className="absolute top-52">
        {isToggleScreen ? (
          <ForgetPassword />
        ) : (
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className=" ml-32 lg:h-4/5  bg-white  border-2  w-full rounded-md drop-shadow-2xl "
            >
              <div className="mt-5">
                {/* <h1 className="text-center text-3xl">
                  <span className="font-bold">digital</span>flake
                </h1>
                 */}

                <img src={"image289.svg"} alt="logo" className="h-20 mx-auto" />
                <p className="text-center mt-3 text-lg text-[#717070]">
                  Welcome to Digitalflake Admin
                </p>
              </div>

              <div className="mt-10 mx-6">
                <div className="">
                  <InputField
                    borderColor="black"
                    textColor="black"
                    label="Email ID"
                    placeholder="Enter Email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={setEmail}
                  />
                </div>
                <div className="mt-10 relative flex">
                  <InputField
                    borderColor="border-gray-900"
                    textColor="black"
                    label="Password"
                    placeholder="Enter Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                  />
                    <ShowPasswordButton
                      onClick={() => setShowPassword(!showPassword)}
                      isVisible={showPassword}
                    />
                </div>
                <div className="flex justify-end my-5 " >
                  <button onClick={() => handleToggleScreen()}>
                    Forget Password?
                  </button>
                </div>
                <div className="flex justify-center">
                  <Button
                    classes="bg-[#5C218B] font-semibold text-white underline mb-10   underline-offset-2  py-2 w-full rounded-md mt-3 hover:bg-purple-700  cursor-pointer"
                    type="submit"
                  >
                    Log In
                  </Button>
                </div>
                {error && (
                  <strong className="text-red-500 text-center mx-auto">
                    {error}
                  </strong>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
