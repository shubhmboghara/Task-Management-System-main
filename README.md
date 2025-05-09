# 🎯 TaskFlow – Role-Based Task Management System

**TaskFlow** is a modern, scalable task management platform built with React.js. It features secure role-based authentication, an intuitive Kanban board for users, and a dedicated Admin Panel for assigning and managing tasks.

> 🚀 Built with real-world practices in mind – designed for teams, startups, and IT firms managing internal workflows.

---

## 🔗 Live Demo

👉 [Visit Live App](https://taskmanagementsystemt.netlify.app/signup)

---

## 📦 Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Routing:** React Router v6  
- **State Management:** React Context API  
- **Persistence:** localStorage  
- **Authentication:** Custom role-based access control  

---

## ✨ Key Features

### 🔐 Authentication & Role Access
- Secure signup/login with `User` or `Admin` role selection  
- Only the user with username `shubham` has Admin privileges  
- Session persistence via `localStorage`  

### 🧑‍💼 Admin Panel
- View and filter all registered users  
- Assign tasks to any user with title, description, and status  
- Monitor overall task distribution and statuses  

### 🧾 User Dashboard
- Personalized dashboard showing tasks assigned to you  
- Dynamic **Kanban board** interface for task status visualization  

### 🗂️ Kanban Functionality
- Three columns: **To Do**, **In Progress**, **Done**  
- Drag-and-drop-style movement (if implemented)  
- Clean, responsive layout powered by Tailwind CSS  

### 📱 Responsive UI
- Fully mobile-friendly and fast-loading  
- Utility classes for rapid styling and consistency  

---

## 🖼️ Screenshots


| Signup                                           | Login                                            |
|--------------------------------------------------|--------------------------------------------------|
| ![Signup](https://github.com/user-attachments/assets/6c913ae2-3b5e-4232-8a73-4c986f00f43e) | ![Login](https://github.com/user-attachments/assets/2b7d4e38-e4bf-4130-9336-9ee2b1c0d8f6) |

| Admin Panel                                      | Dashboard & User View                            |
|--------------------------------------------------|--------------------------------------------------|
| ![Admin](https://github.com/user-attachments/assets/70c2105e-edb7-420a-8c4a-491635eb5655) | ![Dashboard](https://github.com/user-attachments/assets/8dd6784a-3eab-4823-91c6-fe40fbba3da9)  ![View User](https://github.com/user-attachments/assets/884a4e51-dde9-4b59-8735-0fc2fd805598) |

---

## 📁 Project Structure

```text
src/
├── assets/               # Images, icons, and static assets
├── components/
│   ├── Auth/             # Login, Signup components
│   ├── Admin/            # Admin panel & task assignment UI
│   └── Dashboard/        # User dashboard & Kanban board
├── context/
│   └── AuthContext.js    # Authentication & global state logic
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   └── AdminPanel.jsx
├── App.jsx               # Application routes & layout
├── main.jsx              # Entry point & rendering
└── index.css             # Tailwind directives & global styles
👥 Role Permissions
Role	Access	Assign Tasks	View Users	View Own Tasks
Admin	Full Admin Panel access	✅	✅	✅
User	Personal dashboard only	❌	❌	✅
⚙️ Getting Started
✅ Prerequisites
Node.js v16 or newer

npm or yarn package manager

📥 Installation
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/your-username/taskflow.git
cd taskflow

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
🏗️ Build for Production
bash
Copy
Edit
npm run build
✅ Best Practices Followed
🔒 Role-based route protection

♻️ Reusable, modular components

🧠 Global state management via Context API

📱 Fully responsive design with Tailwind CSS

💾 Persistent data storage using localStorage

🛡️ Minimal external dependencies for security & performance

