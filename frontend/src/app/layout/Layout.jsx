import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";


export default function Layout({
    mode,
    toggleTheme,
}) {
    return (
        <>
            <Header
                mode={mode}
                toggleTheme={toggleTheme}
            />

            <Sidebar />

            <main
                style={{
                    marginLeft: 200,
                    marginTop: 64,
                    padding: 24,
                }}
            >
                <Outlet />
            </main>
        </>
    );
}