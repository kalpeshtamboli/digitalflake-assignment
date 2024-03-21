import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Component/Button";
import InputField from "../../Component/InputField/InputField";
import { setToggle } from "../../Slice/Slice";
import axios from 'axios'
const ForgetPassword = () => {
  const dispatch = useDispatch();


  const [email, setEmail] = useState("")

  const handleToggleScreen = () => {
    dispatch(setToggle(false));
  };

  const onChange = (e) => {
    setEmail(e.target.value)
  }


  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/forgetPassword', { email });
      alert('Password reset email sent. Please check your inbox.');
  } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Error sending password reset email. Please try again later.');
  }
  }

  return (
    <div className="flex w-4/5 items-center h-screen">
      <form
          onSubmit={handleSubmit}
        className=" ml-32   border-2  w-full rounded-md drop-shadow-2xl bg-white px-2 "
      >
        <div className="mt-5">
          <h1 className="text-center text-xl font-semibold text-[#5C218B]">
            Did you forget your password?
          </h1>
          <p className="text-center mt-3 text-md font-semibold text-[#717070]">
            Enter your email address and we'll send you a link to restore
            password
          </p>

          {/* <img src={image289} alt="logo"  /> */}
        </div>

        <div className="mt-10 mx-6">
          <div className="">
            <InputField
              borderColor="black"
              textColor="black"
              label="Email Address"
              placeholder="Email Address"
              name="email"
              type="text"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className="text-center mt-10">
            <Button
              classes="bg-[#5C218B] font-semibold text-white my-5  py-2 w-full rounded-md mt-3 hover:bg-purple-700  cursor-pointer"
              type="submit"
            >
              Request reset link
            </Button>
          </div>
          <div className="text-center  mb-5">
            <button onClick={() => handleToggleScreen()}>Back to log in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
