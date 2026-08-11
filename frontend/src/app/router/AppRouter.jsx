import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../../features/auth/Login";

import Dashboard from "../../features/dashboard/Dashboard";
import Companies from "../../features/companies/Companies";
import Applications from "../../features/applications/Applications";
import Recruiters from "../../features/recruiters/Recruiters";
import Tasks from "../../features/tasks/Tasks";
import AICoach from "../../features/ai/AICoach";
import Settings from "../../features/settings/Settings";
import Users from "../../features/users/Users";

import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../features/auth/hooks";


function AdminRoute({ children }) {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}


export default function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/companies"
                            element={<Companies />}
                        />

                        <Route
                            path="/applications"
                            element={<Applications />}
                        />

                        <Route
                            path="/recruiters"
                            element={<Recruiters />}
                        />

                        <Route
                            path="/tasks"
                            element={<Tasks />}
                        />

                        <Route
                            path="/ai"
                            element={<AICoach />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />

                        <Route
                            path="/users"
                            element={
                                <AdminRoute>
                                    <Users />
                                </AdminRoute>
                            }
                        />

                    </Route>
                </Route>

            </Routes>

        </BrowserRouter>
    );
}