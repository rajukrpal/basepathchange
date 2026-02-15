import { createBrowserRouter, Navigate } from "react-router-dom";
import ResetPasswordGuard from "@/guards/ResetPasswordGuard";
import VerifyOtpGuard from "@/guards/VerifyOtpGuard";
import AuthProtectedLayout from "@/layout/AuthProtectedLayout";
import Layout from "@/layout/main";
import ProtectedLayout from "@/layout/ProtectedLayout";
import { BASE_PATH } from "@/lib/apiConfig";

// Auth Pages
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import ResetPassword from "@/pages/auth/ResetPassword";

// Dashboard Pages
import MainDashboard from "@/pages/dashboard/MainDashboard";
import Projects from "@/pages/projects/Projects";
import Tasks from "@/pages/tasks/Tasks";
import Team from "@/pages/team/Team";
import Settings from "@/pages/settings/Settings";
import Notifications from "@/pages/notifications/Notifications";
import Attendance from "@/pages/attendance/Attendance";
import Chat from "@/pages/chat/Chat";

import Error from "@/pages/error/Error";

const router = createBrowserRouter(
  [
    {
      path: "",
      errorElement: <Error />,
      children: [
        {
          element: <ProtectedLayout />,
          children: [
            {
              path: "",
              element: <Layout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="/dashboard" replace />,
                },
                {
                  path: "dashboard",
                  element: <MainDashboard />,
                },
                {
                  path: "projects",
                  element: <Projects />,
                },
                {
                  path: "tasks",
                  element: <Tasks />,
                },
                {
                  path: "team",
                  element: <Team />,
                },
                {
                  path: "settings",
                  element: <Settings />,
                },
                {
                  path: "notifications",
                  element: <Notifications />,
                },
                {
                  path: "attendance",
                  element: <Attendance />,
                },
                {
                  path: "chat",
                  element: <Chat />,
                },
              ],
            },
          ],
        },
        {
          element: <AuthProtectedLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <Signup />,
                    },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "otp-verification",
              element: <VerifyOtpGuard />,
              children: [
                {
                  index: true,
                  element: <VerifyOTP />,
                },
              ],
            },
            {
              path: "reset-password",
              element: <ResetPasswordGuard />,
              children: [
                {
                  index: true,
                  element: <ResetPassword />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename: BASE_PATH }
);

export default router;

