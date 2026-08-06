import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Layout from "../layout/Layout";

import Dashboard from "../../features/dashboard/Dashboard";
import Companies from "../../features/companies/Companies";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/companies"
                        element={<Companies />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}