import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { link } from "../components/Baselink";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FiMail, FiLock, FiUser, FiMapPin, FiCalendar, FiImage } from "react-icons/fi";
import { MdPersonAdd } from "react-icons/md";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [picture, setPicture] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const getYesterdayDate = () => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().split("T")[0];
    };

    const validate = () => {
        if (!username.trim()) { setError("Username is required."); return false; }
        if (!name.trim()) { setError("Full name is required."); return false; }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!password) { setError("Password is required."); return false; }
        if (password.length < 8) { setError("Password must be at least 8 characters."); return false; }
        if (!/(?=.*[A-Z])/.test(password)) { setError("Password must contain at least one uppercase letter."); return false; }
        if (!/(?=.*[0-9])/.test(password)) { setError("Password must contain at least one number."); return false; }
        if (!/(?=.*[!@#$%^&*])/.test(password)) { setError("Password must contain at least one special character (!@#$%^&*)."); return false; }
        if (password !== confirmPassword) { setError("Passwords do not match."); return false; }
        if (dob) {
            const selected = new Date(dob);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (selected > yesterday) { setError("Date of birth cannot be in the future."); return false; }
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                username,
                email,
                password,
                name,
                location: location || undefined,
                picture: picture || undefined,
                otp: "000000",
            };
            // Only include dob if user filled it in — empty string causes Mongoose CastError
            if (dob) payload.dob = dob;

            const response = await axios.post(url + "/api/auth/register", payload);

            const token = response.data.token;
            localStorage.setItem("token", `Bearer ${token}`);
            localStorage.setItem("userId", response.data.user.id);

            dispatch(
                authLogin({
                    _id: response.data.user.id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    name: response.data.user.name,
                    picture: response.data.user.picture,
                    location: response.data.user.location,
                })
            );

            navigate("/");
        } catch (err) {
            const data = err.response?.data;
            setError(data?.error || data?.detail || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Floating particles
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: Math.random() * 70 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 12 + 8,
    }));

    const inputClass =
        "w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm";

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-900 to-blue-900 pt-24 pb-10">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-3xl animate-blob" />
                <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-indigo-600 opacity-20 blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-blue-500 opacity-20 blur-3xl animate-blob animation-delay-4000" />
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-white/5"
                        style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
                        animate={{ y: [0, -25, 0], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg mx-4"
            >
                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 shadow-lg mb-4"
                        >
                            <MdPersonAdd className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
                        <p className="text-indigo-200 mt-2 text-sm">Join the community today — it's free!</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* Username & Full Name side-by-side */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <FiUser className="w-4 h-4 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                                </div>
                                <input
                                    id="reg-username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value); setError(""); }}
                                    placeholder="Username *"
                                    className={inputClass}
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <FiUser className="w-4 h-4 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                                </div>
                                <input
                                    id="reg-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setError(""); }}
                                    placeholder="Full Name *"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FiMail className="w-4 h-4 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                            </div>
                            <input
                                id="reg-email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                placeholder="Email Address *"
                                className={inputClass}
                            />
                        </div>

                        {/* Location & Picture URL side-by-side */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <FiMapPin className="w-4 h-4 text-indigo-300" />
                                </div>
                                <input
                                    id="reg-location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                    className={inputClass}
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <FiImage className="w-4 h-4 text-indigo-300" />
                                </div>
                                <input
                                    id="reg-picture"
                                    type="text"
                                    value={picture}
                                    onChange={(e) => setPicture(e.target.value)}
                                    placeholder="Picture URL"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FiCalendar className="w-4 h-4 text-indigo-300" />
                            </div>
                            <input
                                id="reg-dob"
                                type="date"
                                value={dob}
                                onChange={(e) => { setDob(e.target.value); setError(""); }}
                                max={getYesterdayDate()}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FiLock className="w-4 h-4 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                            </div>
                            <input
                                id="reg-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="Password *"
                                className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-300 hover:text-white transition-colors"
                            >
                                {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FiLock className="w-4 h-4 text-indigo-300 group-focus-within:text-indigo-100 transition-colors" />
                            </div>
                            <input
                                id="reg-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                                placeholder="Confirm Password *"
                                className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-300 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Password hint */}
                        <p className="text-indigo-300/70 text-xs leading-relaxed">
                            Password must be 8+ characters with an uppercase letter, number, and special character (!@#$%^&*).
                        </p>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm"
                            >
                                <span>⚠</span> {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <motion.button
                            id="reg-submit"
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating Account…
                                </>
                            ) : (
                                "Create Account →"
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/20" />
                        <span className="text-indigo-300 text-xs">OR</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-indigo-200 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-white hover:text-indigo-300 underline underline-offset-2 transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Bottom text */}
                <p className="text-center text-indigo-400/60 text-xs mt-6">
                    By registering, you agree to our{" "}
                    <Link to="/privacy-policy" className="underline hover:text-indigo-300 transition-colors">
                        Privacy Policy
                    </Link>
                </p>
            </motion.div>

            {/* Blob animation CSS */}
            <style>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0) scale(1); }
          33% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(20px,-20px) scale(1.05); }
          66% { border-radius: 50% 60% 30% 60% / 40% 30% 60% 50%; transform: translate(-15px,10px) scale(0.98); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
        </div>
    );
};

export default Register;
