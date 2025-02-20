# Get Shit Done 📝🚀  

🔗 **Live Demo:** [Get Shit Done](https://get-shit-done-b90a9.web.app/)  

## Introduction  
**Get Shit Done** is a modern **Task Management Application** that enables users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into **To-Do, In Progress, and Done**, with real-time updates for a seamless user experience. The app features **Firebase Authentication**, a **MongoDB backend**, and a **Vite + React** frontend with TailwindCSS and Ant Design for a clean UI.  

---

## Table of Contents  
- [Features](#features)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Technologies Used](#technologies-used)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features  
✅ **User Authentication** (Google Sign-In via Firebase)  
✅ **Task Management** (Add, Edit, Delete, Reorder tasks)  
✅ **Drag & Drop** (Move tasks between categories)  
✅ **Real-Time Sync** (Tasks persist in MongoDB)  
✅ **Modern UI** (Ant Design + Tailwind CSS)  
✅ **Mobile-Friendly** (Responsive design)  
✅ **Dark Mode** (Bonus)  
✅ **Activity Log** (Bonus: Track task movements)  

---

## Installation  

### Prerequisites  
- **Node.js** (v16 or later)  
- **MongoDB** (Local or Cloud)  
- **Firebase Project** (For authentication)  

### Steps  

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/yourusername/getshitdone.git
   cd getshitdone
   ```

2. **Install Dependencies**  
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory with the following variables:  

   ```sh
   VITE_apiKey=YOUR_FIREBASE_API_KEY
   VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
   VITE_projectId=YOUR_FIREBASE_PROJECT_ID
   VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
   VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
   VITE_appId=YOUR_FIREBASE_APP_ID
   ```

4. **Run the Development Server**  
   ```sh
   npm run dev
   ```

---

## Configuration  

### Backend (Express + MongoDB)  
Ensure MongoDB is running and that the API server is set up to handle:  
- `POST /tasks` – Add a new task  
- `GET /tasks` – Retrieve tasks  
- `PUT /tasks/:id` – Update a task  
- `DELETE /tasks/:id` – Remove a task  

---

## Usage  

1. **Login with Google**  
2. **Create & Manage Tasks**  
   - Add new tasks  
   - Drag & drop between sections  
   - Edit or delete tasks  
3. **Stay Organized**  
   - Tasks persist in the database  
   - Real-time sync across devices  

---

## API Endpoints  

| Method | Endpoint         | Description                     |
|--------|----------------|---------------------------------|
| POST   | `/tasks`        | Add a new task                 |
| GET    | `/tasks`        | Retrieve all tasks             |
| PUT    | `/tasks/:id`    | Update a task                  |
| DELETE | `/tasks/:id`    | Delete a task                  |

---

## Technologies Used  

### Frontend  
- **Vite.js + React** (Fast and modern UI)  
- **Tailwind CSS + Ant Design** (Minimalist styling)  
- **react-beautiful-dnd** (Drag & drop support)  

### Backend  
- **Express.js** (REST API)  
- **MongoDB** (Database for task storage)  
- **WebSockets / Change Streams** (Real-time updates)  

### Authentication  
- **Firebase Authentication** (Google Sign-In)  

---

## Troubleshooting  

- **Issue:** Firebase API key not working  
  - **Solution:** Check `.env` file and Firebase settings.  

- **Issue:** Tasks not updating instantly  
  - **Solution:** Ensure WebSockets or Change Streams are implemented correctly.  

---

## Contributing  

Contributions are welcome! To contribute:  

1. **Fork the repository**  
2. **Create a new branch**  
   ```sh
   git checkout -b feature-name
   ```
3. **Make changes and commit**  
   ```sh
   git commit -m "Added new feature"
   ```
4. **Push to your fork and create a PR**  

---

## License  

This project is licensed under the **MIT License**.  

---

### 🚀 Get started today and **Get Shit Done!** 🎯  
