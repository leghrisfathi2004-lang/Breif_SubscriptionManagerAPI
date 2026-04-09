<div align="center">

```
███████╗██╗   ██╗██████╗ ██╗     ███████╗██████╗  ██████╗ ███████╗██████╗
██╔════╝██║   ██║██╔══██╗██║     ██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
███████╗██║   ██║██████╔╝██║     █████╗  ██║  ██║██║  ███╗█████╗  ██████╔╝
╚════██║██║   ██║██╔══██╗██║     ██╔══╝  ██║  ██║██║   ██║██╔══╝  ██╔══██╗
███████║╚██████╔╝██████╔╝███████╗███████╗██████╔╝╚██████╔╝███████╗██║  ██║
╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝
```

**Subscription Management API — FinTech Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003366?style=for-the-badge&logo=lock&logoColor=white)

</div>

---
## 📖 Overview

**SubLedger** is a secure REST API built for a FinTech startup that lets users track and manage their digital subscriptions. It features role-based access control, JWT-protected routes, and full CRUD for subscription management.

### ✨ Features

- 📝 User registration with hashed passwords
- 🔐 JWT-based login & protected routes
- 📦 Full subscription CRUD (linked to authenticated user)
- 🛡️ Ownership verification on every subscription action
- 👤 system: **User** vs **Admin**
- 🚫 Input validation with clear JSON error responses

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/subledger.git
cd subledger

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in: MONGO_URI, JWT_SECRET, PORT

# Start the server
npm start
```

---

## 🌐 API Reference

> All subscription routes require a valid JWT in the `Authorization` header:
> `Authorization: Bearer <token>`

---

### 👤 Users

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | `POST` | `/users/new` | ❌ | Register a new user |
| 2 | `POST` | `/users/login` | ❌ | Login — returns JWT token |
| 3 | `GET` | `/users/:email` | ✅ JWT | Get user profile + their subscriptions |

---

### 📦 Subscriptions

> All routes below require JWT authentication.

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | `POST` | `/subs` | Add a new subscription |
| 2 | `GET` | `/subs` | Get all your subscriptions |
| 3 | `GET` | `/subs/:id` | Get a subscription by ID |
| 4 | `PATCH` | `/subs/:id` | Edit a subscription by ID |
| 5 | `DELETE` | `/subs/:id` | Delete a subscription by ID |

---

### 🛠️ Admin Routes

> Requires JWT + **admin role**.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users |
| `GET` | `/subs` | List all subscriptions |
| `DELETE` | `/users/:email` | Delete a user by email |

---

## 🔒 Role Matrix

| Route | User | Admin |
|-------|------|-------|
| Register / Login | ✅ | ✅ |
| CRUD own subscriptions | ✅ | ✅ |
| View own profile | ✅ | ✅ |
| List all users | ❌ | ✅ |
| Delete any user | ❌ | ✅ |
| View all subscriptions | ❌ | ✅ |

---

## UML diagramme

<div align="center">
  <img width="600" height="366" alt="Image" src="https://github.com/user-attachments/assets/82740965-a183-4ac3-8388-09945dcc390d" />
</div>

<div align="center">
  <sub>Built with ☕ and async/await — SubLedger © 2024</sub>
</div>
