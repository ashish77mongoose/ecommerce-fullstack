import React, { useState } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { login } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { reactIcons } from "./../utils/icons";
import TextInput from "../components/forms/TextInput";
import { loginValidation } from "../utils/validation";
import { isYupError, parseYupError } from "../utils/yup";
import Spinner from "../components/loaders/Spinner";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(initialState);
  const handleReset = () => {
    setForm(initialState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginValidation.validate(form, {
        abortEarly: false,
      });
      const res = await login({ ...form });
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Login Successfully`} />);
        localStorage.setItem("ashishToken", data.token);
        handleReset();
        navigate("/");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      if (isYupError(error)) {
        setError(parseYupError(error));
      } else {
        toast.error(<ToastMsg title={error.response.data.message} />);
      }
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Spinner />}

      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-10 px-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
        >
          <header className="py-4 text-center text-3xl font-bold">Login</header>
          <div className="px-4 space-y-2">
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
              label="Password"
              type={toggle ? "text" : "password"}
              placeholder="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={error.password}
              addonRight={
                <span
                  onClick={() => setToggle(!toggle)}
                  className="w-8 h-8 ay-center right-2 flex-center rounded-md hover:bg-white/80 text-lg cursor-pointer"
                >
                  {toggle ? reactIcons.eye : reactIcons.eyeslash}
                </span>
              }
            />

            <div>
              <div className="text-muted">
                <Link
                  to="/forgot-password"
                  className="ml-2 text-blue-500 underline"
                >
                  Forgot Password
                </Link>
              </div>{" "}
            </div>
            <div className="text-center">
              <p className="text-muted">
                Don't have an account?{" "}
                <Link className="ml-2 text-blue-500 underline" to="/register">
                  Register
                </Link>
              </p>{" "}
            </div>
          </div>
          <footer className="py-4 text-center font-medium">
            <button
              type="submit"
              className="px-12 py-2 rounded-md bg-green-500 text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default Login;
