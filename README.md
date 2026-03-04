# 📝 React Blog Platform

A full-stack blogging platform built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend. Users can write, publish, and interact with articles — featuring a gamification layer (achievements & streaks), image uploads via Cloudinary, OTP-based authentication, and dark/light theme support.

---

## 🚀 Live Deployment

- **Frontend:** [https://react-blog-lake-omega.vercel.app](https://react-blog-lake-omega.vercel.app)
- **Backend API:** [https://react-blog-onlk.onrender.com](https://react-blog-onlk.onrender.com)

---

## 📁 Project Structure

```
project-1/
├── back-end/                  # Express + MongoDB API server
│   ├── api/                   # Vercel serverless entry point
│   ├── Config/                # Database connection config
│   ├── controllers/           # Route handler logic
│   │   ├── user.controller.js
│   │   ├── article.controller.js
│   │   ├── streak.controller.js
│   │   └── achievement.controller.js
│   ├── middleware/            # Express middlewares
│   │   ├── achievement.middleware.js
│   │   └── streak.middleware.js
│   ├── models/                # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── article.model.js
│   │   ├── achievement.model.js
│   │   ├── streak.model.js
│   │   ├── level.model.js
│   │   ├── otp.model.js
│   │   └── db.js
│   ├── routes/                # Express routers
│   │   ├── user.routes.js
│   │   ├── article.routes.js
│   │   └── achievements.route.js
│   ├── Utils/                 # Utility helpers
│   │   ├── Api.Error.js
│   │   ├── Api.Response.js
│   │   ├── cloudinary.js
│   │   ├── mailsender.js
│   │   ├── otpgenerate.js
│   │   └── EmailTemplates.js
│   ├── app.js                 # Express app setup & route mounting
│   ├── package.json
│   └── envexample.txt         # Example environment variables
│
├── front-end/                 # React + Vite SPA
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Static images & icons
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AchievementComp/
│   │   │   ├── LikeArticles/
│   │   │   ├── SaveForLaterComp/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── AlertDialog.jsx
│   │   │   ├── LikeButton.jsx
│   │   │   ├── Model.jsx
│   │   │   ├── Preloader.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── Tidio.jsx
│   │   │   ├── CursorTrail.jsx
│   │   │   └── ...
│   │   ├── pages/             # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ArticleList.jsx
│   │   │   ├── Article.jsx
│   │   │   ├── AddarticlePage.jsx
│   │   │   ├── EditArticle.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── PublicProfile.jsx
│   │   │   ├── EditProfilePage.jsx
│   │   │   ├── DraftsPage.jsx
│   │   │   ├── SavedArticles.jsx
│   │   │   ├── Contributors.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── Error404.jsx
│   │   │   └── NotFound.jsx
│   │   ├── store/             # Redux state management
│   │   │   ├── authSlice.js
│   │   │   └── store.js
│   │   ├── hooks/             # Custom React hooks
│   │   ├── Utils/             # Frontend utilities
│   │   ├── App.jsx            # Root component & routes
│   │   ├── main.jsx           # App entry point
│   │   └── App.css / index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── vercel.json                # Frontend Vercel deployment config
├── package.json               # Root-level scripts
├── tailwind.config.js
├── Articles.postman_collection.json  # Postman API tests (Articles)
└── User.postman_collection.json      # Postman API tests (Users)
```

---

## ⚙️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| Bcrypt | Password hashing |
| Cloudinary + Multer | Image upload & storage |
| Nodemailer | Email sending (OTP, notifications) |
| OTP-Generator | One-time password generation |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v6 | Client-side routing |
| Redux Toolkit + redux-persist | Global state management |
| Axios | HTTP requests |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| GSAP | Advanced animations |
| Chart.js + react-chartjs-2 | Analytics charts |
| @uiw/react-md-editor | Markdown article editor |
| react-markdown | Markdown rendering |
| Lucide React + React Icons | Icon libraries |
| React Toastify | Toast notifications |
| @headlessui/react | Accessible UI primitives |
| html-to-image | Certificate generation |

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** >= 14.0.0 (Backend), >= 22.x (Frontend)
- **MongoDB** Atlas cluster (or local instance)
- **Cloudinary** account (for image uploads)
- **Gmail** account with App Password (for nodemailer)

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project-1
```

---

### 2. Backend Setup

```bash
cd back-end
npm install
```

Create a `.env` file in `back-end/` using `envexample.txt` as a reference:

```env
CONNECTION_URL="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
PORT=8080
JWT_SECRET="your_jwt_secret_here"
SECRET_KEY="your_very_long_secret_key_here"
MAIL_HOST=smtp.gmail.com
MAIL_USER=youremail@gmail.com
MAIL_PASS=your_gmail_app_password
```

Start the backend development server:

```bash
npm run dev      # Uses nodemon for hot-reload
# or
npm start        # Production start
```

The server will run on **http://localhost:8080**

---

### 3. Frontend Setup

```bash
cd front-end
npm install
npm run dev
```

The frontend will run on **http://localhost:5173**

---

## 🗄️ Database Models

### User
| Field | Type | Description |
|---|---|---|
| `username` | String | Unique username |
| `email` | String | User email |
| `password` | String | Bcrypt hashed password |
| `name` | String | Display name |
| `location` | String | User location |
| `picture` | String | Cloudinary avatar URL |
| `dob` | Date | Date of birth |
| `age` | Number | Auto-calculated from dob |
| `accountCreated` | Date | Registration date |
| `articlesPublished` | Number | Count of published articles |
| `isEmailVerified` | Boolean | OTP verification status |
| `likedArticles` | [ObjectId] | Refs to liked articles |
| `commentedArticles` | [ObjectId] | Refs to commented articles |
| `saveForLater` | [ObjectId] | Bookmarked articles |
| `draftArticles` | [ObjectId] | User's draft articles |
| `authorLevel` | ObjectId | Ref to Level model |
| `achievements` | [ObjectId] | Earned achievements |
| `followers` | [ObjectId] | Follower user IDs |
| `following` | [ObjectId] | Following user IDs |

### Article
| Field | Type | Description |
|---|---|---|
| `name` | String | Unique URL slug |
| `title` | String | Article title |
| `content` | String | Markdown content |
| `thumbnail` | String | Cloudinary image URL |
| `author` | ObjectId | Ref to User |
| `authorName` | String | Cached author name |
| `comments` | [ObjectId] | Refs to Comment |
| `likes` | Number | Like count |
| `likedBy` | [ObjectId] | Users who liked |
| `tag` | String | Category tag |
| `status` | String | `'draft'` or `'published'` |
| `reactions` | Array | Emoji reactions with user refs |

**Predefined Tags:** `Technology`, `Gaming`, `Music`, `Movies`

**Supported Reactions:** 👍 ❤️ 😂 😮 😢 😡

### Comment
| Field | Type | Description |
|---|---|---|
| `username` | String | Commenter's username |
| `text` | String | Comment body |
| `article` | ObjectId | Ref to Article |
| `user` | ObjectId | Ref to User |

### Achievement
| Field | Type | Description |
|---|---|---|
| `name` | String | Achievement title |
| `user` | ObjectId | Ref to User |
| `image` | String | Badge image URL |
| `achievedOn` | Date | When it was earned |

### Streak
| Field | Type | Description |
|---|---|---|
| `user` | ObjectId | Ref to User |
| `streak` | Number | Current streak count |
| `lastUpdate` | Date | Last login/activity date |

---

## 🌐 API Reference

**Base URL:** `https://react-blog-onlk.onrender.com` (production) or `http://localhost:8080` (local)

---

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register/generate-otp` | Send registration OTP to email | ❌ |
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login with email/username + password | ❌ |
| GET | `/getProfile` | Get current logged-in user's profile | ✅ |
| POST | `/editProfile` | Update profile (with optional avatar upload) | ✅ |
| POST | `/deleteAccount/generate-otp` | Send OTP for account deletion | ✅ |
| DELETE | `/deleteAccount` | Permanently delete user account | ✅ |
| POST | `/forgot-password/generate-otp` | Send OTP for password reset | ❌ |
| POST | `/reset-password` | Reset user password via OTP | ❌ |
| GET | `/user/:userId` | View another user's public profile | ❌ |
| POST | `/follow/:userToFollowId` | Follow a user | ✅ |
| POST | `/unfollow/:userToUnfollowId` | Unfollow a user | ✅ |
| GET | `/streak` | Get current user's login streak | ✅ |

---

### 📰 Article Routes — `/api/article`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/addarticle` | Publish a new article (with thumbnail upload) | ✅ |
| POST | `/getarticle` | Get a specific article by slug/name | ❌ |
| GET | `/getallarticle` | Get all published articles | ❌ |
| POST | `/getarticlesbyuser` | Get all articles by a specific user | ❌ |
| POST | `/addcomment` | Add a comment to an article | ✅ |
| POST | `/editarticle` | Edit an existing article | ✅ |
| POST | `/getarticlebyid` | Get article by MongoDB ObjectId | ❌ |
| DELETE | `/deletearticle` | Delete an article by ID | ✅ |
| POST | `/like/:articleId` | Like or unlike an article | ✅ |
| POST | `/getarticlebytag` | Filter articles by tag | ❌ |
| POST | `/saveforlater` | Bookmark an article | ✅ |
| POST | `/create-draft` | Save article as a draft | ✅ |
| GET | `/drafts` | Get current user's draft articles | ✅ |
| GET | `/getsavedlarticles` | Get user's bookmarked articles | ✅ |
| POST | `/removeSavedArticle` | Remove bookmark | ✅ |
| GET | `/getrecentomment/:id` | Get recent comments for an article | ❌ |
| POST | `/react/:articleId` | Add emoji reaction to article | ✅ |
| DELETE | `/react/:articleId` | Remove emoji reaction | ✅ |
| GET | `/reactions/:articleId` | Get all reactions for an article | ❌ |

---

### 🏆 Achievement Routes — `/api/achievement`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Get all achievements for current user | ✅ |

---

### 📧 Mail Route

| Method | Endpoint | Description |
|---|---|---|
| POST | `/sendMail` | Send an email (contact form) |

---

## 🔒 Authentication

The API uses **JWT (JSON Web Tokens)** for protected routes.

**Token format:** `Authorization: Bearer <token>`

Tokens are issued on login and must be included in the `Authorization` header for any protected endpoint.

---

## 🏆 Gamification System

### Login Streaks
- Users earn a **daily login streak** tracked via the `Streak` model
- The `checkStreak` middleware runs on every login
- If a user misses **more than 1 day**, their streak is **reset to 0**
- Streak count is shown on the user's profile and dashboard

### Achievements (Badges)
Three automatic achievements are awarded based on activity milestones:

| Badge | Trigger Condition |
|---|---|
| 🖊️ **Blogger** | Published 10+ articles |
| 💬 **Commenter** | Commented on 10+ articles |
| 👍 **Reactor** | Liked 15+ articles |

The achievement middleware (`achievement.middleware.js`) automatically checks and awards badges — it runs as middleware on the `addarticle`, `addcomment`, and `like` routes.

---

## 🖥️ Frontend Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing page |
| `/about` | `About.jsx` | About the platform |
| `/faq` | `FAQ.jsx` | Frequently asked questions |
| `/privacy-policy` | `PrivacyPolicy.jsx` | Privacy policy page |
| `/article-list` | `ArticleList.jsx` | Browse all articles with filters |
| `/article/:name` | `Article.jsx` | Single article view with comments & reactions |
| `/addarticle` | `AddarticlePage.jsx` | Markdown editor for new articles |
| `/edit-article/:id` | `EditArticle.jsx` | Edit an existing article |
| `/dashboard` | `Dashboard.jsx` | User analytics dashboard |
| `/profile` | `ProfilePage.jsx` | Logged-in user's own profile |
| `/profile/:userId` | `PublicProfile.jsx` | Public view of another user's profile |
| `/edit-profile` | `EditProfilePage.jsx` | Edit profile form |
| `/achievements` | `AchievementPage` | User's earned achievement badges |
| `/drafts` | `DraftsPage.jsx` | User's saved drafts |
| `/savedArticles` | `SavedArticles.jsx` | Bookmarked articles |
| `/contributors` | `Contributors.jsx` | Project contributors page |
| `/forgot-password` | `ForgotPassword.jsx` | Password reset flow |
| `*` | `Error404.jsx` | 404 catch-all page |

---

## 🗃️ State Management (Redux)

The frontend uses **Redux Toolkit** with `redux-persist` to persist state across page reloads.

### `authSlice`

| State | Default | Description |
|---|---|---|
| `authStatus` | `false` | Whether user is logged in |
| `user` | `null` | Logged-in user's data object |
| `theme` | `'light'` | Current UI theme |

**Actions:**
- `login(userData)` — Set auth status & user data
- `logout()` — Clear auth state
- `toggleTheme()` — Switch between `light` and `dark`

---

## 🎨 Theme System

The app supports **light and dark modes** toggled via Redux. The active theme class is applied to `document.documentElement`, enabling CSS variable-driven theming across the entire app.

---

## ☁️ Image Uploads

All image uploads (article thumbnails & user avatars) go through:
1. **Multer** — Accepts `multipart/form-data` and buffers file to memory
2. **Cloudinary** — Streams the buffer to Cloudinary for cloud storage
3. The returned Cloudinary URL is saved to MongoDB

---

## 📬 Email / OTP System

OTP-based flows for:
- **Registration** verification
- **Account deletion** confirmation
- **Password reset**

Emails are sent using **Nodemailer** with Gmail SMTP. HTML email templates are stored in `Utils/EmailTemplates.js`.

---

## 🚢 Deployment

### Frontend (Vercel)
The frontend is deployed directly on Vercel with SPA rewrite rules:

```json
{
  "buildCommand": "cd front-end && npm install && npm run build",
  "outputDirectory": "front-end/dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Backend (Render)
The backend is deployed on **Render** as a Node.js web service. The entry point is `back-end/api/index.js`.

---

## 🧪 Testing — Postman Collections

Two Postman collections are included at the root of the project:

- **`Articles.postman_collection.json`** — API tests for all article endpoints
- **`User.postman_collection.json`** — API tests for all user/auth endpoints

Import either file into [Postman](https://www.postman.com/) to test the API.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

> **Note:** When testing locally, ensure `app.js` has CORS set to `origin: '*'`. Before making a PR, switch CORS origin back to the production frontend URL.

---

## 📄 License

This project is open-source. See the repository for license details.
