import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import toast from "react-hot-toast";

const Signup = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  // state for storing the from data 
  const [form, setForm] = useState({ username: "", email: "", password: ""});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //signup function
  const handleSignup = async (e) => {
    e.preventDefault();

    // sending data to server
    try {
      const res = await api.post("/auth/signup", form);
      setCurrentUser(res.data);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>

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
            Signup
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account

          <button onClick={() => navigate("/sigin")}
            className="text-green-600 hover:underline">
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;
