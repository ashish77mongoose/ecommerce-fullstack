import React, { useState } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reactIcons } from "../utils/icons";
import TextInput from "../components/forms/TextInput";
import { resetPassword } from "../api/api";
const initialState = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
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
      const res = await resetPassword({userId,token,password:form.password});

      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Password Updated Successfully`} />);
        handleReset();
        navigate("/login");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-10 px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
      >
        <header className="py-4 text-center text-3xl font-bold">
          Reset Password
        </header>
        <div className="px-4 space-y-2">
          <TextInput
            label={"Password"}
            type={toggle ? "text" : "password"}
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleChange}
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
            addonRight={
              <span
                onClick={() => setToggle(!toggle)}
                className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
              >
                {toggle ? reactIcons.eye : reactIcons.eyeslash}
              </span>
            }
          />
        </div>
        <footer className="py-4 text-center font-medium">
          <button type="submit" className="btn-green">
            Reset
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ResetPassword;
