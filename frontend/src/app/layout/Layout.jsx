import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <Header />
      <Sidebar />

      <main
        style={{
          marginLeft: 240,
          marginTop: 64,
          padding: 24,
        }}
      >
        <Outlet />
      </main>
    </>
  );
}