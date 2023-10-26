import React, { useState } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { register } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { reactIcons } from "../utils/icons";
import TextInput from "../components/forms/TextInput";
import {  registerValidation } from "../utils/validation";
import { isYupError, parseYupError } from "../utils/yup";
import Spinner from "../components/loaders/Spinner";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
    
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(initialState);
  const handleReset = () => {
    setForm(initialState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    
    try {
        await registerValidation.validate(form, {
            abortEarly: false,
          });
          let formData = { ...form };
      delete formData.confirmPassword;
      const res = await register(formData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Register Successfully`} />);
        handleReset();
        navigate("/login");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
        if (isYupError(error)) {
            setError(parseYupError(error));
          }
      console.log(error, "error");
    }finally {setIsLoading(false)}

  };
  return (
    <>
    {isLoading && <Spinner/>}
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-10 px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
      >
        <header className="py-4 text-center text-3xl font-bold">
          Register
        </header>
        <div className="px-4 space-y-2">
          <div className="flex items-start gap-4">
            <TextInput
              label={"First Name"}
              type="text"
              placeholder="first name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={error.firstName}
            />
            <TextInput
              label={"Last Name"}
              type="text"
              placeholder="last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={error.lastName}
            />
          </div>
          <TextInput
            label={"Email"}
            type="text"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={error.email}
          />
          <TextInput
            label={"Password"}
            type={toggle ? "text" : "password"}
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={error.password}
            addonRight={
              <span
                onClick={() => setToggle(!toggle)}
                className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
              >
                {toggle ? reactIcons.eye : reactIcons.eyeslash}
              </span>
            }
          />
          <TextInput
            label={"Confirm Password"}
            type={toggle ? "text" : "password"}
            placeholder="confirm password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={error.confirmPassword}
            addonRight={
              <span
                onClick={() => setToggle(!toggle)}
                className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
              >
                {toggle ? reactIcons.eye : reactIcons.eyeslash}
              </span>
            }
          />
          <div>
            <p className="text-muted">
              Already have an account?{" "}
              <Link className="ml-2 text-blue-500 underline" to="/login">
                Login
              </Link>
            </p>{" "}
          </div>
        </div>
        <footer className="py-4 text-center font-medium">
          <button type="submit" className="btn-green">
            { isLoading? 'Loading...' :'Register'}
          </button>
        </footer>
      </form>
    </div>
    </>
  );
};

export default Register;
