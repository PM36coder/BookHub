# 📚 BookVerse – A Full Stack MERN Book App

BookVerse is a modern full-stack MERN application that allows users to explore, like, and manage books in a personal bookshelf. It includes full user authentication, clean UI, and a responsive frontend.

---

## 🔐 Features

- 🔒 **User Authentication**
  - Registration, Login, Logout
  - JWT-based secure auth with password hashing using `bcryptjs`

- 📚 **Bookshelf Management**
  - Like/Unlike books
  - Add or remove from personal bookshelf

- 🌐 **Frontend (React + Vite)**
  - Built with React
  - TailwindCSS for sleek and responsive UI
  - Page animations using `Framer Motion`
  - Routing with `react-router-dom`
  - Global auth state using `Context API`

- ⚙️ **Backend (Node.js + Express)**
  - RESTful API for user & book routes
  - Authentication middleware
  - MongoDB as database (via Mongoose)

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **React** | Frontend library for building UI |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Smooth animations |
| **Axios** | HTTP client for API calls |
| **React Router DOM** | Client-side routing |
| **Node.js** | JavaScript runtime for backend |
| **Express.js** | Web framework for Node.js |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication token |
| **bcryptjs** | Password hashing |

---

## 📂 Folder Structure (Simplified)
bookverse/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
├── backend/ # Node + Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js




---

## 🚀 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse

