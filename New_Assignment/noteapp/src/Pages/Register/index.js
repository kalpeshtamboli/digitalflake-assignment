import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../Component/Button";
import FileUpload from "../../Component/FileUpload";
import Input from "../../Component/InputField";
import ErrorMessage from "../../Component/ErrorMessage";

const Register = () => {
  const [getImgName, setGetImgName] = useState(null);
  const [error, setError] = useState(null);
  const [userDetail, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too Long!")
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("This field is required"),
  });

  const getImageName = useMemo(
    () => (getName) => {
      getName.map((file) => {
        setGetImgName(file.name);
      });
    },
    []
  );

  // const getImageName = (getName) => {
  //   getName.map((file) => {
  //     setGetImgName(file.name);
  //   });
  // };

  const onChange = (name, value) => {
    setUserDetails({ ...userDetail, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          ...userDetail,
          picName: getImgName,
        }
      );

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error && <strong className="text-red-500">{error}</strong>}

      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              borderColor="blue"
              textColor="black"
              label="Name"
              placeholder="Enter Name"
              name="name"
              type="text"
              onChange={onChange}
            />
            {errors.name && touched.name ? (
              <ErrorMessage message={errors.name} />
            ) : null}

            <Input
              borderColor="blue"
              textColor="black"
              label="Email"
              placeholder="Enter Email"
              name="email"
              type="text"
              onChange={onChange}
            />
            {errors.email && touched.email ? (
              <ErrorMessage message={errors.email} />
            ) : null}

            <Input
              borderColor="blue"
              textColor="black"
              label="Password"
              placeholder="Enter Password"
              name="password"
              type="password"
              onChange={onChange}
            />
            {errors.password && touched.password ? (
              <ErrorMessage message={errors.password} />
            ) : null}

            <Input
              borderColor="blue"
              textColor="black"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={onChange}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <ErrorMessage message={errors.confirmPassword} />
            ) : null}

            <Button
              classes={"py-2 px-10 bg-blue-600 rounded-md mt-5"}
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <FileUpload getImageName={getImageName} />
    </div>
  );
};

export default Register;
