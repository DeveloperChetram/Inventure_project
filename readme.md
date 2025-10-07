# MERN Stack Product Management App

This is a full-stack web application for managing products, built with the MERN (MongoDB, Express, React, Node.js) stack. It includes features for user authentication, product CRUD (Create, Read, Update, Delete), pagination, and search.

## Features

-   **User Authentication**: Secure Sign Up and Sign In functionality using JWT.
-   **Product Management**: Full CRUD operations for products.
-   **Search**: Dynamically search for products by name.
-   **Pagination**: Efficiently browse through a large list of products.
-   **Protected Routes**: CRUD operations are protected and can only be performed by authenticated users.
-   **State Management**: Frontend state is managed using Redux Toolkit without Thunk.

## Tech Stack

-   **Backend**: Node.js, Express.js, MongoDB (with Mongoose), JWT, bcryptjs
-   **Frontend**: React, React Router, Redux Toolkit, Axios

---

## Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── redux/
    │   │   ├── actions/
    │   │   └── slices/
    │   ├── App.jsx
    │   └── main.jsx
    └── README.md
```

---

## Prerequisites

-   Node.js (v18.x or higher)
-   npm
-   MongoDB (You can use a local instance or a cloud service like MongoDB Atlas)

---

## Setup and Installation

### 1. Backend Setup

First, navigate to the `backend` directory and set up the server.

```bash
# 1. Go to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the root of the /backend folder
#    and add the following variables:
PORT=3001
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>

# 4. Start the backend server
npm start
```

The backend server will be running on **`http://localhost:3001`**.

### 2. Frontend Setup

Open a **new terminal** and navigate to the `frontend` directory.

```bash
# 1. Go to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the frontend development server
npm run dev
```

The frontend application will be running on **`http://localhost:5173`** (or another port if 5173 is busy).

---

## How to Use the App

1.  **Register a new user**: Navigate to the `/register` page and create an account.
2.  **Login**: Use your new credentials to log in on the `/login` page.
3.  **Manage Products**: Once logged in, you will see an interface to add, edit, and delete products.
4.  **View Products**: Click on any product name to see its details.
5.  **Search & Paginate**: Use the search bar to filter products by name and the pagination controls to navigate through the product list.