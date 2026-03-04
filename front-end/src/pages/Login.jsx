import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { link } from "../components/Baselink";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const Login = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.authStatus);
    const url = `${link}`;

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!credential.trim()) {
            setError("Please enter your email or username.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(url + "/api/auth/login", {
                credential,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("token", `Bearer ${token}`);
            localStorage.setItem("userId", response.data.userId);

            dispatch(
                authLogin({
                    _id: response.data.userId,
                    username: response.data.username,
                    email: response.data.email,
                    name: response.data.name,
                    picture: response.data.picture,
                    location: response.data.location,
                })
            );

            navigate("/");
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) setError("Incorrect password. Please try again.");
            else if (status === 404) setError("No account found with that email or username.");
            else setError("Login failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Floating particles config
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: Math.random() * 80 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 12 + 8,
    }));

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-900 pt-20">
            {/* Animated Blob Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600 opacity-20 blur-3xl animate-blob" />
                <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-purple-600 opacity-20 blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-blue-500 opacity-20 blur-3xl animate-blob animation-delay-4000" />
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-white/5"
                        style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
                        animate={{ y: [0, -30, 0], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
                    {/* Logo / Branding */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg mb-4"
                        >
                            <FiUser className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
                        <p className="text-indigo-200 mt-2 text-sm">Sign in to your account to continue</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Credential Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FiMail className="w-5 h-5 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                            </div>
                            <input
                                id="login-credential"
                                type="text"
                                value={credential}
                                onChange={(e) => { setCredential(e.target.value); setError(""); }}
                                placeholder="Email or Username"
                                autoComplete="username"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FiLock className="w-5 h-5 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                            </div>
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="Password"
                                autoComplete="current-password"
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-300 hover:text-white transition-colors"
                            >
                                {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm"
                            >
                                <span className="text-base">⚠</span>
                                {error}
                            </motion.div>
                        )}

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-indigo-300 hover:text-white text-sm transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <motion.button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/20" />
                        <span className="text-indigo-300 text-xs">OR</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-indigo-200 text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-white hover:text-indigo-300 underline underline-offset-2 transition-colors"
                        >
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Bottom text */}
                <p className="text-center text-indigo-400/60 text-xs mt-6">
                    By signing in, you agree to our{" "}
                    <Link to="/privacy-policy" className="underline hover:text-indigo-300 transition-colors">
                        Privacy Policy
                    </Link>
                </p>
            </motion.div>

            {/* Inline CSS for blob animation */}
            <style>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0) scale(1); }
          33% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(20px, -20px) scale(1.05); }
          66% { border-radius: 50% 60% 30% 60% / 40% 30% 60% 50%; transform: translate(-15px, 10px) scale(0.98); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
        </div>
    );
};

export default Login;
