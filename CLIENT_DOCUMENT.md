# React Blog Platform
### Client Project Overview Document
**Prepared by:** Development Team
**Date:** March 2026
**Version:** 1.0

---

## 1. 📌 Project Summary

We have built a **full-featured, modern blogging platform** that allows users to create, publish, and interact with articles online. The platform is live on the internet and accessible from any device — desktop, tablet, or mobile.

The platform includes everything expected from a professional blog website:
- User accounts with profiles
- Writing and publishing articles
- Reader engagement (likes, comments, reactions)
- A reward system to keep users motivated
- An admin-friendly dashboard with analytics
- A clean, modern design with dark/light mode

---

## 2. 🌐 Live Website Links

| | Link |
|---|---|
| 🌍 **Website (Frontend)** | https://react-blog-lake-omega.vercel.app |
| ⚙️ **API Server (Backend)** | https://react-blog-onlk.onrender.com |

> Both services are deployed on the cloud and are accessible 24/7.

---

## 3. ✅ Features Delivered

### 👤 User Accounts
- **Register** with email verification (OTP sent to email)
- **Login** with email or username and password
- **Forgot password** — reset via OTP email
- **Delete account** — secured with OTP confirmation
- **Profile page** with name, bio, location, profile picture
- **Edit profile** — update personal info and avatar image

### 📝 Article Writing & Publishing
- Rich **Markdown editor** for writing articles
- Upload a **thumbnail/cover image** for each article
- Choose a **category tag** (Technology, Gaming, Music, Movies)
- **Save as Draft** before publishing (for review/editing)
- **Edit** or **Delete** a published article
- **Drafts page** to manage all saved drafts

### 📖 Reading & Discovery
- **Article listing page** — browse all published articles
- **Filter articles by tag/category**
- **Search-friendly** article URLs (clean slugs like `/article/my-article-title`)
- **Full article view** with formatted content

### 💬 Social & Engagement
- **Like** articles (with count display)
- **Emoji Reactions** — readers can react with: 👍 ❤️ 😂 😮 😢 😡
- **Comments** — readers can post comments on any article
- **Save for Later** — bookmark articles to read later
- **Follow / Unfollow** other authors
- **Public Profiles** — view any author's profile and their articles

### 🏆 Gamification (Reward System)
To keep users engaged, the platform includes a built-in reward system:

| Feature | How it works |
|---|---|
| 🔥 **Daily Login Streak** | Login every day to build a streak. Miss a day and it resets. |
| 🖊️ **Blogger Badge** | Awarded after publishing 10 articles |
| 💬 **Commenter Badge** | Awarded after commenting on 10 articles |
| 👍 **Reactor Badge** | Awarded after liking 15 articles |

Badges are shown on the user's profile as a trophy wall.

### 📊 Author Dashboard
Each registered author gets a **personal dashboard** showing:
- Number of articles published
- Analytics charts
- Recent comments on their articles
- Quick access to drafts

### 🎨 Design & Experience
- **Light & Dark mode** toggle (saved across sessions)
- Smooth **page transition animations**
- **Loading preloader** on first visit
- **Interactive cursor effects**
- **Toast notifications** for all actions (success/error messages)
- **Responsive design** — works on all screen sizes
- **Certificate generator** — users can generate a personalized certificate

### 📧 Email Notifications
The platform sends automated emails for:
- Account registration (OTP verification)
- Password reset (OTP)
- Account deletion confirmation (OTP)

### 🔒 Security
- Passwords are **encrypted** (never stored as plain text)
- All protected pages require a **JWT token** (secure login session)
- OTP verification for all sensitive account actions

---

## 4. 🖥️ Pages & Screens

| Page | Description |
|---|---|
| **Home** | Landing page with welcome content |
| **Article List** | Browse all published articles |
| **Article View** | Read full article with comments & reactions |
| **Write Article** | Markdown editor to create & publish |
| **Edit Article** | Modify an existing article |
| **Drafts** | Manage unpublished drafts |
| **Saved Articles** | View your bookmarked articles |
| **My Profile** | Your personal profile with stats & badges |
| **Public Profile** | View another user's profile & articles |
| **Edit Profile** | Update your personal info & avatar |
| **Achievements** | Gallery of earned reward badges |
| **Dashboard** | Analytics and activity overview |
| **Contributors** | Credits page |
| **About** | About the platform |
| **FAQ** | Frequently asked questions |
| **Privacy Policy** | Legal privacy information |
| **Forgot Password** | OTP-based password reset |
| **404 Page** | Custom error page |

---

## 5. 🛠️ Technology Used

> *(This section is for technical reference — no action needed from the client)*

| Area | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (cloud-hosted on MongoDB Atlas) |
| Image Storage | Cloudinary |
| Authentication | JWT (JSON Web Tokens) + Bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 6. 📱 Supported Devices

The platform is **fully responsive** and tested on:
- ✅ Desktop (Windows & Mac)
- ✅ Tablet
- ✅ Mobile (Android & iOS browsers)

---

## 7. 🚀 Deployment & Hosting

The project is deployed on two cloud platforms:

### Frontend — Vercel
- Auto-rebuilds whenever code is updated
- Global CDN for fast page loads worldwide
- Free SSL certificate (HTTPS)

### Backend API — Render
- Node.js server hosting the API
- Connected to MongoDB Atlas (cloud database)
- Environment variables securely stored

---

## 8. 📦 What Was Delivered

| Item | Status |
|---|---|
| User registration & login system | ✅ Done |
| OTP email verification | ✅ Done |
| Article create / edit / delete | ✅ Done |
| Draft saving | ✅ Done |
| Image upload (thumbnail + avatar) | ✅ Done |
| Like, react, comment system | ✅ Done |
| Save for later / bookmarks | ✅ Done |
| Follow / unfollow users | ✅ Done |
| Achievement badge system | ✅ Done |
| Daily login streak tracking | ✅ Done |
| Author dashboard with analytics | ✅ Done |
| Public user profiles | ✅ Done |
| Dark / light mode toggle | ✅ Done |
| Responsive design (mobile-ready) | ✅ Done |
| Deployment (live on internet) | ✅ Done |
| Postman API test collection | ✅ Done |

---

## 9. 🔧 Future Enhancements (Optional Scope)

The following features can be added in future phases if required:

- 🔔 Real-time notifications (WebSockets)
- 🔍 Full-text article search
- 💬 Nested/threaded comments
- 📩 Newsletter subscription
- 👑 Admin panel for content moderation
- 📤 Social media sharing integration
- 🌐 Multi-language support

---

## 10. 📞 Contact & Support

For any queries, feature requests, or issues regarding the project, please reach out to the development team.

---

*This document was prepared to provide a clear and complete overview of the React Blog Platform project delivered to the client. All features listed above have been implemented and are live.*
