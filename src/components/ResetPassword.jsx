import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./api";

const ResetPassword = () => {
  const { key, login } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_PASSWORD_RESET}`,
        { key, login, newPassword }
      );

      toast.success(response.data?.message || "Password reset successful");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer top-[30px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className=" text-sm mt-4">
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

export default ResetPassword;
