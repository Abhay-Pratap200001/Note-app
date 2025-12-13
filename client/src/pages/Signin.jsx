import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import toast from "react-hot-toast";

const Signin = ({ setCurrentUser }) => {

  const navigate = useNavigate();

  // state for storing form data
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });



  // Signin functiom
  const handleSignin = async (e) => {
    e.preventDefault();

    // sending data to server
    try {
      const res = await api.post("/auth/signin", form);
      setCurrentUser(res.data);
      toast.success("Logged in!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sigin failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          No account

          <button onClick={() => navigate("/signup")}
            className="text-green-600 hover:underline">
            Create one
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signin;
