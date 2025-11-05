import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import { toast } from "react-toastify";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post(
        import.meta.env.VITE_API_REQUEST_PASSWORD_RESET,
        { email }
      );
      let data = response.config.data;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      toast.success(`Password reset link sent to ${data.email}`);
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 text-white ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sending..." : "Request Password Reset"}
          </button>

          <div className="text-center text-sm mt-4">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordReset;
