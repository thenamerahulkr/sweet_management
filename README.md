# 🍭 Sweet Shop Management System

A comprehensive full-stack MERN application for managing a sweet shop inventory, built with **Test-Driven Development (TDD)** principles and modern development practices.

## 🎯 Project Overview

This project demonstrates proficiency in:
- **Full-stack development** with MERN stack
- **Test-Driven Development (TDD)** methodology
- **RESTful API design** and implementation
- **Authentication & Authorization** with JWT
- **Modern frontend development** with React
- **Database design** and management
- **Clean coding practices** and SOLID principles

## 🛠️ Technology Stack

### Backend
- **Framework**: Node.js with Express (JavaScript)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest and Supertest
- **Validation**: Joi
- **Security**: Helmet, CORS, bcryptjs

### Frontend
- **Framework**: React (JavaScript)
- **Styling**: Custom CSS (Tailwind-inspired)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Testing**: Jest and React Testing Library

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with validation
- JWT-based secure authentication
- Role-based access control (Admin/User)
- Protected routes and API endpoints

### 🍬 Sweet Management
- **Create**: Add new sweets with details (Admin only)
- **Read**: View all available sweets with search and filtering (All authenticated users)
- **Update**: Modify sweet details (Admin only)
- **Delete**: Remove sweets (Admin only)

### 📦 Inventory Management
- **Purchase System**: Buy sweets with quantity validation (All authenticated users)
- **Restock System**: Replenish inventory (Admin only)
- **Real-time Updates**: Live inventory tracking
- **Stock Validation**: Prevent overselling

### 🔍 Search & Filter
- Search by sweet name
- Filter by category
- Price range filtering
- Real-time search results

## 🚀 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | User registration | Public |
| `POST` | `/api/auth/login` | User login | Public |

### Sweet Management Endpoints (Protected)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/sweets` | Add a new sweet | Admin Only |
| `GET` | `/api/sweets` | Get all sweets | All Authenticated Users |
| `GET` | `/api/sweets/search` | Search sweets by name, category, price | All Authenticated Users |
| `PUT` | `/api/sweets/:id` | Update sweet details | Admin Only |
| `DELETE` | `/api/sweets/:id` | Delete sweet | Admin Only |

### Inventory Management Endpoints (Protected)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/sweets/:id/purchase` | Purchase sweet (decreases quantity) | All Authenticated Users |
| `POST` | `/api/sweets/:id/restock` | Restock sweet (increases quantity) | Admin Only |

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/thenamerahulkr/sweet_management.git
cd sweet_management
```

2. **Install all dependencies:**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

3. **Set up environment variables:**

**Backend (.env in backend folder):**
```bash
MONGODB_URI="mongodb://localhost:27017/sweetshop"
# OR for MongoDB Atlas:
# MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/sweetshop"

JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
NODE_ENV=development
```

**Frontend (.env in frontend folder):**
```bash
REACT_APP_API_URL=http://localhost:3001
```

4. **Set up the database:**
```bash
# Make sure MongoDB is running locally, OR
# Use MongoDB Atlas cloud database
# The application will automatically connect and create collections
```

5. **Seed the database (optional):**
```bash
cd backend
npm run seed
```

6. **Start the development servers:**

**Option 1: Start both servers simultaneously**
```bash
npm run dev
```

**Option 2: Start servers separately**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm start
```

### 🌐 Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** principles with comprehensive test coverage.

### Run All Tests
```bash
# Run all tests (backend + frontend)
npm test
```

### Backend Tests
```bash
cd backend

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### 📊 Test Results
- **Total Tests**: 28 passing
- **Test Suites**: 2 passing  
- **Coverage**: 64% overall
- **All API endpoints tested**
- **Authentication & authorization covered**
- **Input validation tested**

See [TEST_REPORT.md](./TEST_REPORT.md) for detailed test coverage analysis.

## 🏗️ Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm install -g serve
serve -s build
```

### Full Production Build
```bash
npm run build
```

## 🤖 My AI Usage

### AI Tools Used
- **Kiro AI Assistant**: Used as a development assistant and coding companion throughout the project

### How I Used AI Assistance

#### 1. **Project Planning & Architecture**
- **Consultation**: Asked AI for best practices in MERN stack project structure
- **Research**: Used AI to understand TDD methodology and implementation strategies
- **Planning**: Discussed API design patterns and database schema approaches

#### 2. **Development Assistance**
- **Code Review**: Asked AI to review my code for potential improvements and best practices
- **Problem Solving**: Used AI to help debug issues and understand error messages
- **Syntax Help**: Got assistance with JavaScript/React syntax and MongoDB queries
- **Boilerplate**: Asked AI to help generate repetitive code structures that I then customized

#### 3. **Testing Strategy**
- **Test Planning**: Discussed comprehensive test coverage strategies with AI
- **Test Cases**: Brainstormed edge cases and error scenarios with AI assistance
- **Jest Setup**: Got help configuring Jest and understanding testing best practices
- **Assertion Logic**: Asked AI for guidance on writing meaningful test assertions

#### 4. **Documentation & Code Quality**
- **README Structure**: Used AI to help organize and improve documentation
- **Code Comments**: Asked AI to suggest areas where comments would be helpful
- **Error Messages**: Got assistance in writing clear, user-friendly error messages
- **Validation**: Used AI to help implement comprehensive input validation

### My Development Process

#### What I Did Myself:
- **🎯 Project Requirements Analysis**: Analyzed the TDD Kata requirements independently
- **🏗️ Architecture Decisions**: Made all major architectural and technology choices
- **💻 Core Implementation**: Wrote the majority of business logic and application flow
- **🧪 Test Design**: Designed test scenarios based on requirements understanding
- **🎨 UI/UX Design**: Created the user interface design and user experience flow
- **🔧 Configuration**: Set up development environment and deployment configuration
- **📋 Project Management**: Managed timeline, priorities, and feature implementation

#### Where AI Helped:
- **📚 Learning**: Explained concepts I wasn't familiar with
- **🔍 Code Review**: Suggested improvements and caught potential issues
- **⚡ Productivity**: Helped with repetitive coding tasks and boilerplate
- **🐛 Debugging**: Assisted in troubleshooting and error resolution
- **📖 Documentation**: Helped structure and improve project documentation

### Reflection on AI Impact

#### Benefits of AI Assistance:
- **Learning Acceleration**: AI helped me understand new concepts and patterns quickly
- **Code Quality**: AI suggestions improved my code structure and best practices
- **Productivity Boost**: Reduced time spent on repetitive tasks and syntax lookup
- **Error Prevention**: AI helped catch potential issues before they became problems
- **Best Practices**: Learned industry standards and modern development practices

#### My Learning Outcomes:
- **MERN Stack Proficiency**: Gained hands-on experience with full-stack development
- **TDD Methodology**: Learned to write tests first and follow red-green-refactor cycle
- **API Design**: Understood RESTful API principles and implementation
- **Authentication**: Implemented JWT-based authentication and authorization
- **Database Design**: Learned MongoDB schema design and Mongoose ODM

#### Maintaining Ownership:
- **Understanding**: I understand every line of code in this project
- **Customization**: All AI suggestions were reviewed and adapted to project needs
- **Decision Making**: All architectural and implementation decisions were mine
- **Problem Solving**: I solved complex problems with AI as a research assistant
- **Quality Assurance**: I tested and validated all functionality personally

### Professional Development Statement

This project represents my work as a developer using modern tools and AI assistance responsibly. The AI served as an intelligent assistant - similar to how developers use Stack Overflow, documentation, or pair programming - to enhance productivity while maintaining full ownership and understanding of the codebase.

I believe this approach demonstrates:
- **Adaptability**: Using modern tools effectively in software development
- **Learning Agility**: Quickly acquiring new skills with available resources
- **Code Ownership**: Maintaining responsibility and understanding of all implementations
- **Professional Growth**: Leveraging AI to become a more effective developer

The final product showcases my ability to deliver a complete, tested, and production-ready application using industry best practices and modern development workflows.

## 📸 Screenshots

### Login Page
![Login Page](./screenshots/login-page.png)
*Clean, responsive login interface with validation*

### Registration Page  
![Registration Page](./screenshots/registration-page.png)
*User registration with role selection (User/Admin)*

### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)
*Admin dashboard with full CRUD operations - Add, Edit, Delete, Restock sweets*

### User Dashboard
![User Dashboard](./screenshots/user-dashboard.png)
*User dashboard with purchase functionality and inventory display*

### Search & Filter with Category Dropdown
![Dashboard with Filters](./screenshots/dashboard-with-filters.png)
*Advanced search functionality by name, category, and price range with dropdown filters*

### Edit Sweet Modal (Admin Only)
![Edit Sweet Modal](./screenshots/edit-sweet-modal.png)
*Admin-only edit functionality with form validation and image URL support*

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=build
```

### Environment Variables for Production
```bash
# Backend
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sweetshop
JWT_SECRET=super-secure-production-secret
NODE_ENV=production
PORT=3001

# Frontend
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

## 📋 Project Structure

```
sweet-shop-management/
├── backend/                 # Node.js/Express API
│   ├── __tests__/          # Test files
│   ├── middleware/         # Auth & error handling
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding
│   ├── validation/        # Input validation schemas
│   └── server.js          # Main server file
├── frontend/               # React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # React components
│       ├── contexts/      # React contexts
│       └── services/      # API services
├── screenshots/           # Application screenshots
├── .gitignore            # Git ignore rules
├── TEST_REPORT.md        # Detailed test report
└── README.md             # Project documentation
```

## 🎯 Key Achievements

- ✅ **100% TDD Implementation** - All features built with tests first
- ✅ **28 Passing Tests** - Comprehensive test coverage
- ✅ **RESTful API Design** - Clean, consistent API architecture  
- ✅ **JWT Authentication** - Secure user authentication system
- ✅ **Role-Based Access** - Admin vs User permission system
- ✅ **Responsive Design** - Mobile-first, cross-device compatibility
- ✅ **Input Validation** - Comprehensive data validation
- ✅ **Error Handling** - Robust error management
- ✅ **Clean Code** - SOLID principles and best practices
- ✅ **Modern Tech Stack** - Latest MERN stack implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rahul Kumar**
- GitHub: [@thenamerahulkr](https://github.com/thenamerahulkr)
- Project Repository: [Sweet Management System](https://github.com/thenamerahulkr/sweet_management)

---

*Built with ❤️ using MERN stack and TDD principles*