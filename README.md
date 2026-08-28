# Atish Central Residential School (ACRS) Management System

Full-stack MERN application for managing student, teacher, and admin workflows in a centralized school platform.

## 1. Project Highlights

- Role-based dashboards: Student, Teacher, Admin
- JWT authentication and protected routes
- Public website pages: Home, About, Facilities, Gallery, Contact, Testimonials
- Teacher workflows: update marks, update attendance, post academic/sports updates
- Student workflows: view marks, attendance, profile, and teacher posts
- Admin workflows: user management, school data management, testimonial moderation, gallery management
- Interactive dashboard overview with chart views
- Image upload support for gallery (local uploads)

## 2. Tech Stack

- Frontend: React (Vite), Material UI, Axios, Recharts
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- Authentication: JWT + role-based authorization middleware

## 3. Current Auth Structure

- Unified access page: `/auth`
  - Student section: Login + Register
  - Teacher section: Login + Register
- Dedicated auth pages:
  - Student login: `/login`
  - Student register: `/register`
  - Teacher login: `/teacher-login`
  - Teacher register: `/teacher-register`

## 4. Credentials (Testing)

Use these credentials only after creating these users in your local database.

- Student
  - Email: `student@acrs.local`
  - Password: `123456`

- Teacher
  - Email: `teacher@acrs.local`
  - Password: `123456`

- Admin
  - Email: `admin@acrs.local`
  - Password: `123456`

### Important Note

Student and teacher accounts can be created from the app UI using register pages.

Admin account must be created manually in MongoDB (or from an existing admin account) with role set to `admin`.

## 5. Project Structure

```txt
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
frontend/
  src/
    api/
    components/
    context/
    layouts/
    pages/
      public/
      dashboard/
```

## 6. Setup Instructions (Easy Client Guide)

Follow these steps exactly from the project root folder.

### Step 1: Requirements

- Install Node.js LTS (includes npm): https://nodejs.org
- Install MongoDB Community Server and start MongoDB locally

### Step 2: Create Environment Files

Create these 2 files and copy values from section 7:

- `backend/.env`
- `frontend/.env`

### Step 3: Install Dependencies

Run these commands one time:

```bash
cd backend
npm install
cd ..
cd frontend
npm install
cd ..
```

### Step 4: Start the Project (Use 2 Terminals)

Open two terminals in the project root.

Terminal 1: Start Backend

```powershell
cd backend
npm.cmd run dev
```

Terminal 2: Start Frontend

```powershell
cd frontend
npm.cmd run dev
```

If you are using Command Prompt, Git Bash, or macOS/Linux terminal, you can use:

```bash
npm run dev
```

### Step 5: Open in Browser

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Backend Health Check: http://localhost:5000/api/health

### Quick Troubleshooting

If PowerShell shows this error:

"running scripts is disabled on this system" for `npm.ps1`

Use `npm.cmd` instead of `npm` in PowerShell commands.

If old credentials stop working, ensure backend `MONGO_URI` includes a fixed database name (example: `mongodb://localhost:27017/acrs`). Without a DB name, MongoDB may connect to a different default database and previous users will not be found.

## 7. Environment Variables

### backend/.env

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/acrs
JWT_SECRET=replace_with_strong_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### frontend/.env

```env
VITE_API_URL=http://localhost:5000/api
```

## 8. Key API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/teacher-register
- POST /api/auth/teacher-login
- GET /api/auth/me

### Student

- GET /api/student/profile
- GET /api/student/marks
- GET /api/student/attendance
- GET /api/student/posts

### Teacher

- GET /api/teacher/students
- GET /api/teacher/marks
- POST /api/teacher/marks
- POST /api/teacher/attendance
- GET /api/teacher/posts
- POST /api/teacher/posts

### Admin

- GET /api/admin/overview
- GET /api/admin/users
- POST /api/admin/users
- PUT /api/admin/users/:id
- DELETE /api/admin/users/:id
- GET /api/admin/school-data
- POST /api/admin/school-data
- DELETE /api/admin/school-data/:id
- GET /api/admin/testimonials
- PATCH /api/admin/testimonials/:id
- DELETE /api/admin/gallery/:id

### Public

- GET /api/public/home
- GET /api/public/gallery
- POST /api/public/gallery (admin only)
- GET /api/public/testimonials
- POST /api/public/testimonials

## 9. Testing Checklist

- Register student and teacher from auth pages
- Login as student and verify marks, attendance, posts, profile
- Login as teacher and verify marks/attendance updates and student posts
- Login as admin and verify management modules
- Validate role-based route protection

## 10. Deployment

- Backend: Render or Railway
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas

Update all environment variables on deployment platforms before go-live.
