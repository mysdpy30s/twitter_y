import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 0.2 }}>
        <Navbar />
      </div>
      <div style={{ flex: 0.8 }}>
        <Outlet />
      </div>
    </div>
  );
}
