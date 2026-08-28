import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import FacilitiesPage from "./pages/public/FacilitiesPage";
import GalleryPage from "./pages/public/GalleryPage";
import ContactPage from "./pages/public/ContactPage";
import TestimonialsPage from "./pages/public/TestimonialsPage";
import AuthPortalPage from "./pages/public/AuthPortalPage";
import LoginPage from "./pages/public/LoginPage";
import TeacherLoginPage from "./pages/public/TeacherLoginPage";
import TeacherRegisterPage from "./pages/public/TeacherRegisterPage";

import DashboardHome from "./pages/dashboard/DashboardHome";
import StudentMarksPage from "./pages/dashboard/StudentMarksPage";
import StudentAttendancePage from "./pages/dashboard/StudentAttendancePage";
import StudentPostsPage from "./pages/dashboard/StudentPostsPage";
import StudentProfilePage from "./pages/dashboard/StudentProfilePage";
import TeacherStudentsPage from "./pages/dashboard/TeacherStudentsPage";
import TeacherStudentRegistrationPage from "./pages/dashboard/TeacherStudentRegistrationPage";
import TeacherMarksPage from "./pages/dashboard/TeacherMarksPage";
import TeacherAttendancePage from "./pages/dashboard/TeacherAttendancePage";
import TeacherPostsPage from "./pages/dashboard/TeacherPostsPage";
import AdminUsersPage from "./pages/dashboard/AdminUsersPage";
import AdminSchoolDataPage from "./pages/dashboard/AdminSchoolDataPage";
import AdminTestimonialsPage from "./pages/dashboard/AdminTestimonialsPage";
import AdminGalleryPage from "./pages/dashboard/AdminGalleryPage";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/auth" element={<AuthPortalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/teacher-register" element={<TeacherRegisterPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />

        <Route
          path="student/marks"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentMarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/attendance"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentAttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/posts"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentPostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="teacher/students"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherStudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/student-registration"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherStudentRegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/marks"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherMarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherAttendancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="teacher/posts"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherPostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/school-data"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSchoolDataPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/testimonials"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminTestimonialsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/gallery"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminGalleryPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
