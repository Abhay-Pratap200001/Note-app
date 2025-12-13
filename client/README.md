# 📝 Note App – MERN Stack Application

A full-stack **Note / Task Management Application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **JWT-based authentication using HTTP-only cookies**.

This project allows users to **Sign up, Sign in, and Sign out**, and once authenticated, users can **create, read, update, and delete their own tasks (notes)**.

---

## 🚀 Features

### 🔐 Authentication

* User Signup
* User Signin
* User Signout (Logout)
* JWT authentication stored in **HTTP-only cookies**
* Protected backend routes using middleware

### ✅ Task (Note) Management

* Create a task with **title** and **description**
* View all tasks created by the logged-in user
* Update existing tasks
* Delete tasks
* Tasks are **user-specific** (no user can access another user's tasks)

### 🔍 Search & Filter

* **Search tasks** by title or description (real-time)
* **Filter tasks** by creation date:

  * Latest first
  * Oldest first
* Search and filter work together seamlessly
* Improves usability for managing large task lists

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* Cookie-parser
* bcryptjs

---

## 📁 Project Structure

```
NOTE APP
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Signin.jsx
│   │   │   └── Signup.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server
│   ├── config
│   │   └── db.connection.js
│   ├── controller
│   │   ├── auth.controller.js
│   │   └── note.controller.js
│   ├── middleware
│   │   └── error.middleware.js
│   ├── Models
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── Routes
│   │   ├── note.Routes.js
│   │   └── user.Routes.js
│   ├── utils
│   │   ├── ApiError.js
│   │   └── verifyToken.js
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

---

## 🔑 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/auth/signup`  | Register a new user |
| POST   | `/api/auth/signin`  | Login user          |
| POST   | `/api/auth/signout` | Logout user         |

### 📝 Task (Note) Routes *(Protected)*

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | `/api/note`     | Create a new task  |
| GET    | `/api/note`     | Get all user tasks |
| PUT    | `/api/note/:id` | Update a task      |
| DELETE | `/api/note/:id` | Delete a task      |

---

## 🔒 Authentication Flow

1. User signs up or signs in
2. Server generates a JWT token
3. Token is stored in an **HTTP-only cookie**
4. Protected routes verify token using `verifyToken` middleware
5. Authenticated users can manage tasks

---

## ▶️ How to Run Locally

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd note-app
```

### 2️⃣ Backend Setup

```bash
npm install
```

Create a `.env` file in root:

```env
PORT=7000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Validation & Security

* Required field validation for tasks
* Centralized error handling
* Protected routes using JWT middleware
* Secure password hashing using bcrypt

---

## 🌐 Build & Deployment

To build frontend for production:

```bash
npm run build
```

* Frontend is served from `client/dist`
* Backend and frontend can be deployed together (Render / Railway / VPS)

---

## 👨‍💻 Author

**Abhay Pratap**
MERN Stack Developer
