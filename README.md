# IBM Ride App - Node.js Backend

A comprehensive ride-sharing application backend built with Node.js, featuring dual database architecture, JWT authentication, and role-based access control.

## 🚀 Features

- **User Management**: Registration, login, profile management
- **Vehicle Management**: Add, update, and manage vehicles
- **Ride Booking**: Create rides, accept rides, track status
- **Payment Processing**: Handle ride payments and transactions
- **Rating System**: Rate drivers and riders
- **Role-Based Access**: Separate functionality for riders and drivers
- **Dual Database**: MongoDB for flexible data, MySQL for structured data
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Clean and organized API endpoints

## 🛠️ Tech Stack & Node.js Concepts Implemented

### **Core Technologies**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** with Mongoose - NoSQL database
- **MySQL** with Sequelize - SQL database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### **Node.js Curriculum Topics Implemented (22 Topics)**

#### **1. Express.js Framework**
- **Files**: `app.js`, `index.js`
- **Implementation**: Server setup, middleware configuration, routing

#### **2. Working with npm and Modules**
- **Files**: `package.json`
- **Implementation**: ES6 modules (`import/export`), dependency management

#### **3. Basic routing and middleware**
- **Files**: `app.js`, `routes/*.routes.js`
- **Implementation**: RESTful API routes, custom middleware chain

#### **4. Handling query, path, and body parameters**
- **Files**: All controller files (`controllers/*.controller.js`)
- **Implementation**: Express request parsing, parameter extraction

#### **5. Modularizing routes and controllers**
- **Files**: `routes/` folder, `controllers/` folder
- **Implementation**: Separated route definitions and business logic

#### **6. RESTful API development**
- **Files**: All route and controller files
- **Implementation**: Complete CRUD operations for Users, Vehicles, Rides, Payments, Ratings

#### **7. Databases and Persistence**
- **Files**: `database/db.mongodb.js`, `database/db.mysql.js`
- **Implementation**: Dual database architecture (MongoDB + MySQL)

#### **8. Connecting Node.js with MongoDB using Mongoose**
- **Files**: `database/db.mongodb.js`, MongoDB model files
- **Implementation**: Mongoose connection and ODM

#### **9. Connecting to MySQL (PostgreSQL equivalent)**
- **Files**: `database/db.mysql.js`
- **Implementation**: Sequelize ORM with MySQL

#### **10. Authentication and Security**
- **Files**: `middlewares/auth.middleware.js`
- **Implementation**: JWT authentication, token verification

#### **11. JWT authentication**
- **Files**: `middlewares/auth.middleware.js`, user controller
- **Implementation**: Token generation, verification, cookie handling

#### **12. Role-based access control**
- **Files**: `middlewares/role.middleware.js`, controllers
- **Implementation**: User role validation, access restrictions

#### **13. Error handling in async code**
- **Files**: `middlewares/errorHandler.middleware.js`, `utils/` folder
- **Implementation**: Global error handling, async error catching

#### **14. Asynchronous Programming**
- **Files**: All controller and database files
- **Implementation**: async/await patterns throughout

#### **15. Promises and Promise.all**
- **Files**: `index.js` (database connections), controllers
- **Implementation**: Promise-based database operations

#### **16. async/await syntax**
- **Files**: All modern JavaScript files
- **Implementation**: Consistent async/await usage

#### **17. Creating and exporting your own modules**
- **Files**: All utility, middleware, and service files
- **Implementation**: ES6 module exports/imports

#### **18. ES2015+ Features**
- **Files**: Throughout the codebase
- **Implementation**: Arrow functions, destructuring, template literals, const/let

#### **19. Object destructuring**
- **Files**: Throughout controllers and middleware
- **Implementation**: Request object destructuring, response handling

#### **20. Rest and Spread Operators**
- **Files**: Various utility functions
- **Implementation**: Function parameters, object manipulation

#### **21. export and import syntax**
- **Files**: All files use ES6 modules
- **Implementation**: Named and default exports/imports

#### **22. Node.js Architecture (Event Loop, Non-blocking I/O)**
- **Files**: Server implementation
- **Implementation**: Async operations, database connections, HTTP handling

<pre>
├── app.js                          # Express app configuration
├── index.js                        # Server entry point
├── package.json                     # Dependencies and scripts
├── controllers/                     # Business logic
│   ├── user.controller.js
│   ├── vehicle.controller.js
│   ├── ride.controller.js
│   ├── payments.controller.js
│   └── rating.controller.js
├── routes/                          # API route definitions
│   ├── user.routes.js
│   ├── vehicle.routes.js
│   ├── ride.routes.js
│   ├── payment.routes.js
│   └── rating.routes.js
├── middlewares/                     # Custom middleware
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── errorHandler.middleware.js
├── models/                          # Database models
│   ├── mongodbmodels/
│   │   ├── payment.model.js
│   │   └── rating.model.js
│   └── mysqlmodels/
│       ├── user.model.js
│       ├── vehicle.model.js
│       └── ride.model.js
├── database/                        # Database connections
│   ├── db.mongodb.js
│   └── db.mysql.js
└── utils/                          # Utility functions
    └── asyncHandler.js
</pre>

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- MySQL
- npm or yarn

### Environment Variables
Create a `.env` file in the root directory:

\`\`\`env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/rideapp
DB_NAME=rideapp
MYSQL_DB=rideapp
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_HOST=localhost

# Server Configuration
PORT=3000

# JWT Configuration
ACCESS_TOKEN_SECRET=your_jwt_secret_key
ACCESS_TOKEN_EXPIRY=24h
\`\`\`

### Installation Steps

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd ibm-ride-app
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Setup databases**
- Start MongoDB service
- Start MySQL service
- Create MySQL database: `CREATE DATABASE rideapp;`

4. **Run the application**
\`\`\`bash
npm start
\`\`\`

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### **User Management**
<pre>
POST   /api/users/register     # Register new user
POST   /api/users/login        # User login
GET    /api/users/:id          # Get user profile (Protected)
PUT    /api/users/:id          # Update user profile (Protected)
DELETE /api/users/:id          # Delete user (Protected)
</pre>

### **Vehicle Management**
<pre>
POST   /api/vehicles           # Add vehicle (Protected)
GET    /api/vehicles           # List vehicles (Protected)
GET    /api/vehicles/:id       # Get vehicle details (Protected)
PUT    /api/vehicles/:id       # Update vehicle (Protected)
DELETE /api/vehicles/:id       # Delete vehicle (Protected)
</pre>

### **Ride Management**
<pre>
POST   /api/rides              # Create ride (Protected)
GET    /api/rides/listrides    # List rides (Protected)
GET    /api/rides/:id          # Get ride details (Protected)
PATCH  /api/rides/:id/status   # Update ride status (Driver only)

# Driver-specific routes
GET    /api/rides/driver/pending    # Get pending rides (Driver only)
POST   /api/rides/driver/:id/accept # Accept ride (Driver only)
GET    /api/rides/driver/ongoing    # Get ongoing rides (Driver only)
GET    /api/rides/driver/history    # Get ride history (Driver only)
</pre>

### **Payment Management**
<pre>
POST   /api/payments           # Process payment (Protected)
GET    /api/payments           # List payments (Protected)
GET    /api/payments/:id       # Get payment details (Protected)
</pre>

### **Rating System**
<pre>
POST   /api/ratings            # Submit rating (Protected)
GET    /api/ratings            # List ratings (Protected)
GET    /api/ratings/:id        # Get rating details (Protected)
</pre>

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** to receive a JWT token
2. **Include token** in Authorization header: `Bearer <token>`
3. **Protected routes** require valid JWT token
4. **Role-based routes** require specific user roles (driver/rider)

### Example Authentication Flow
\`\`\`javascript
// Login request
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}

// Use token in subsequent requests
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

## 🏗️ Architecture Highlights

### **Dual Database Strategy**
- **MySQL**: Structured data (Users, Vehicles, Rides)
- **MongoDB**: Flexible data (Payments, Ratings)

### **Middleware Chain**
1. **Authentication**: JWT token verification
2. **Authorization**: Role-based access control
3. **Error Handling**: Global error catching
4. **Async Handling**: Promise-based error management

### **Security Features**
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization

**Built with ❤️ using Node.js and modern JavaScript practices**

