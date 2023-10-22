import React, { useState } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/forms/TextInput";
import { forgotRequest } from "../api/api";
const initialState = {
  email: "",
};
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const handleReset = () => {
    setForm(initialState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotRequest(form);

      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(
          <ToastMsg title={`Sent successfully please check your mail`} />
        );
        handleReset();
        navigate("/login");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-10 px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
      >
        <header className="py-4 text-center text-3xl font-bold">
          Forgot Password
        </header>
        <div className="px-4 space-y-2">
          <TextInput
            label={"Email"}
            type="text"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <div className="text-center">
            <Link className="ml-2 text-blue-500 underline" to="/login">
              Back to login
            </Link>
          </div>
        </div>
        <footer className="py-4 text-center font-medium">
          <button
            type="submit"
            className="px-12 py-2 rounded-md bg-green-500 text-white"
          >
            Send Request
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ForgotPassword;
