import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";

export default function ProtectedLayout() {
  const token = getToken;
  return (
    <div>
      {token && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
