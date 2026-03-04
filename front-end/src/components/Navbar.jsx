import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { link } from "./Baselink";
import { BsMoon, BsSun } from "react-icons/bs";
import { HiHome, HiInformationCircle, HiNewspaper, HiUser, HiMenu, HiX } from 'react-icons/hi';
import { LuSearch } from "react-icons/lu";
import { login as authLogin, logout as authLogout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBookBookmark } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FiBell, FiBookmark, FiEdit3, FiSettings } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { useClickAway } from 'react-use';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdArticle } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const url = `${link}`;
  const authUser = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const locationOfPage = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Click-away listeners
  useClickAway(searchRef, () => setShowSearch(false));
  useClickAway(notificationsRef, () => setShowNotifications(false));
  useClickAway(profileDropdownRef, () => setShowProfileDropdown(false));

  // Notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      message: 'New comment on your article "React Best Practices"',
      time: new Date(Date.now() - 7200000),
      read: false,
      link: '/article/1#comments'
    },
    {
      id: 2,
      type: 'like',
      message: 'John Doe liked your article',
      time: new Date(Date.now() - 10800000),
      read: false,
      link: '/article/2'
    },
    {
      id: 3,
      type: 'follow',
      message: 'Sarah Smith started following you',
      time: new Date(Date.now() - 18000000),
      read: true,
      link: '/profile/sarah'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Load profile from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(url + "/api/auth/getProfile")
        .then((response) => {
          const u = response.data.user;
          dispatch(authLogin({
            _id: u._id,
            username: u.username,
            email: u.email,
            name: u.name,
            picture: u.picture,
            location: u.location,
          }));
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(authLogout());
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(authLogout());
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowProfileDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/article-list?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // ── Styling helpers ──────────────────────────────────────────────────────
  const navBg = theme === 'light'
    ? 'bg-white/90 backdrop-blur-md'
    : 'bg-gray-900/90 backdrop-blur-md';

  const navClass = `fixed w-full z-50 transition-all duration-300 ${navBg} ${theme === 'light'
    ? 'shadow-[0_4px_20px_rgb(0,0,0,0.05)]'
    : 'shadow-[0_4px_20px_rgb(255,255,255,0.05)]'
    }`;

  const linkClass = `group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium
    transition-all duration-300 transform hover:scale-105 ${theme === 'light'
      ? 'text-gray-600 hover:text-blue-600'
      : 'text-gray-300 hover:text-blue-400'
    }`;

  const getLinkClass = (path) => {
    const isActive = locationOfPage.pathname === path;
    return `group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-300 transform hover:scale-105 
        ${isActive
        ? theme === 'light' ? 'text-indigo-600' : 'text-purple-400'
        : theme === 'light' ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-300 hover:text-purple-400'
      }`;
  };

  const getUnderlineClass = (path) => {
    const isActive = locationOfPage.pathname === path;
    return `absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2
        transition-all duration-300 ease-out
        ${isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'}
        ${theme === 'light' ? 'bg-indigo-600' : 'bg-purple-400'}`;
  };

  // ── Sub-components ───────────────────────────────────────────────────────
  const NotificationIcon = ({ type }) => {
    switch (type) {
      case 'comment': return <MdArticle className="w-5 h-5 text-blue-500" />;
      case 'like': return <AiOutlineHeart className="w-5 h-5 text-red-500" />;
      case 'follow': return <BiUserCircle className="w-5 h-5 text-green-500" />;
      default: return <IoNotificationsOutline className="w-5 h-5 text-gray-500" />;
    }
  };

  const UserAvatar = ({ user, size = "md" }) => {
    const sizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
    return (
      <div className={`${sizes[size]} rounded-full overflow-hidden`}>
        {user?.picture ? (
          <img src={user.picture} alt={user.username} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    );
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      setNotifications(notifications.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      ));
    }
    navigate(notification.link);
    setShowNotifications(false);
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span>
                <img src={logo} alt="img" className="w-20 p-3 rounded-full" />
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`${linkClass} p-2`}
                  aria-label="Search"
                >
                  <LuSearch className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                    >
                      <form onSubmit={handleSearch} className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            autoFocus
                          />
                          <button type="submit" className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <LuSearch className="w-5 h-5" />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/" className={`${getLinkClass('/')} group`}>
                <HiHome className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span>Home</span>
                <div className={getUnderlineClass('/')} />
              </Link>
              <Link to="/about" className={`${getLinkClass('/about')} group`}>
                <HiInformationCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span>About</span>
                <div className={getUnderlineClass('/about')} />
              </Link>
              <Link to="/article-list" className={`${getLinkClass('/article-list')} group`}>
                <HiNewspaper className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span>Articles</span>
                <div className={getUnderlineClass('/article-list')} />
              </Link>

              {isLoggedIn && (
                <Link to='/savedArticles'>
                  <div className="flex flex-row gap-3 justify-center items-center">
                    <FaBookBookmark size={15} color="gray" />
                    <span>Saved</span>
                  </div>
                </Link>
              )}

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`${linkClass} p-2 relative`}
                  aria-label="Notifications"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold dark:text-white">Notifications</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={markAllAsRead}
                              className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              Mark all as read
                            </button>
                            <span className="text-sm text-gray-500">|</span>
                            <button
                              onClick={() => navigate('/notifications')}
                              className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              See all
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                          {notifications.length > 0 ? (
                            notifications.map(notification => (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleNotificationClick(notification)}
                                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer
                                  ${!notification.read
                                    ? 'bg-blue-50 dark:bg-blue-900/20'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                  } transition-colors duration-200`}
                              >
                                <NotificationIcon type={notification.type} />
                                <div className="flex-1">
                                  <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                                    {notification.message}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {getTimeAgo(notification.time)}
                                  </span>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                                )}
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No notifications yet
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Buttons / Profile */}
              <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full
                      transition-all duration-300 transform hover:scale-105 ${theme === 'light'
                          ? 'bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                        }`}
                    >
                      <UserAvatar user={authUser} size="lg" />
                      <span>{authUser?.username || ""}</span>
                    </button>

                    <AnimatePresence>
                      {showProfileDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
                        >
                          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                              <UserAvatar user={authUser} size="lg" />
                              <div>
                                <h3 className="font-semibold dark:text-white">{authUser?.username}</h3>
                                <p className="text-sm text-gray-500">{authUser?.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <button
                              onClick={handleProfileClick}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <HiUser className="w-5 h-5" />
                              <span>Profile</span>
                            </button>
                            <button
                              onClick={() => { navigate('/dashboard'); setShowProfileDropdown(false); }}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <RiDashboardLine className="w-5 h-5" />
                              <span>Dashboard</span>
                            </button>
                            <button
                              onClick={() => { navigate('/addarticle'); setShowProfileDropdown(false); }}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <FiEdit3 className="w-5 h-5" />
                              <span>Write Article</span>
                            </button>
                            <button
                              onClick={() => { navigate('/savedArticles'); setShowProfileDropdown(false); }}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <FiBookmark className="w-5 h-5" />
                              <span>Saved Articles</span>
                            </button>
                            <button
                              onClick={() => { navigate('/settings'); setShowProfileDropdown(false); }}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <FiSettings className="w-5 h-5" />
                              <span>Settings</span>
                            </button>
                            <hr className="my-2 border-gray-200 dark:border-gray-700" />
                            <button
                              onClick={logout}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span>Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // ── New: dedicated Login / Register nav buttons ──
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${theme === 'light'
                          ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                          : 'border-indigo-400 text-indigo-400 hover:bg-indigo-900/30'
                        }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Register
                    </Link>
                  </div>
                )}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full 
                  transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${theme === 'light'
                      ? 'bg-gray-100 hover:bg-blue-50 text-yellow-500 hover:text-yellow-600'
                      : 'bg-gray-800 hover:bg-gray-700 text-blue-400 hover:text-blue-300'
                    }`}
                >
                  {theme === 'light' ? (
                    <BsSun className="w-5 h-5" />
                  ) : (
                    <BsMoon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${theme === 'light'
                    ? 'hover:bg-gray-100 text-gray-600'
                    : 'hover:bg-gray-800 text-gray-300'
                  }`}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                    <HiX className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div initial={{ rotate: 0 }} animate={{ rotate: 0 }}>
                    <HiMenu className="h-6 w-6" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className={`px-6 py-4 space-y-3 shadow-lg ${theme === 'light'
            ? 'bg-white/95 backdrop-blur-md'
            : 'bg-gray-900/95 backdrop-blur-md'
            }`}>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <button type="submit" className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <LuSearch className="w-5 h-5" />
                </button>
              </div>
            </form>

            <Link to="/" className={`${linkClass} w-full`} onClick={() => setIsOpen(false)}>
              <HiHome className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`${linkClass} w-full`} onClick={() => setIsOpen(false)}>
              <HiInformationCircle className="w-5 h-5 mr-2" />
              <span>About</span>
            </Link>
            <Link to="/article-list" className={`${linkClass} w-full`} onClick={() => setIsOpen(false)}>
              <HiNewspaper className="w-5 h-5 mr-2" />
              <span>Articles</span>
            </Link>

            {isLoggedIn ? (
              <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => { handleProfileClick(); setIsOpen(false); }}
                  className={`w-full text-left ${linkClass}`}
                >
                  <HiUser className="w-5 h-5 mr-2" />
                  <span>{authUser?.username || ""}</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-red-500 hover:text-red-600 transition-all duration-300 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${theme === 'light'
                      ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      : 'border-indigo-400 text-indigo-400 hover:bg-indigo-900/30'
                    }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center ${linkClass}`}
              >
                {theme === 'light' ? (
                  <>
                    <BsSun className="w-5 h-5 mr-2" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <BsMoon className="w-5 h-5 mr-2" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
