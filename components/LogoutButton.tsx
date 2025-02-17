import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2"
    >
      Logout
    </button>
  );
}
