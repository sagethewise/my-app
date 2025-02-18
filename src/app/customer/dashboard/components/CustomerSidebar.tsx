"use client"; // ✅ Client Component olarak işaretlendi

import { useRouter } from "next/navigation";
import { FaUser, FaShieldAlt, FaFileAlt, FaSignOutAlt, FaHome } from "react-icons/fa";

const CustomerSidebar = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("User logged out.");
    alert("You have been logged out.");
    
    // Kullanıcıyı giriş sayfasına yönlendir
    router.push("/login");
  };

  return (
    <aside className="bg-white shadow-lg rounded-lg text-gray-500 w-64 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

      <nav>
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveSection("latest-updates")} className="flex items-center space-x-2 hover:text-blue-500 w-full text-left">
              <FaHome />
              <span>Latest Updates</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection("profile")} className="flex items-center space-x-2 hover:text-blue-500 w-full text-left">
              <FaUser />
              <span>Profile</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection("preferences")} className="flex items-center space-x-2 hover:text-blue-500 w-full text-left">
              <FaShieldAlt />
              <span>Preferences</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection("reports")} className="flex items-center space-x-2 hover:text-blue-500 w-full text-left">
              <FaFileAlt />
              <span>Reports</span>
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500 hover:text-red-700 w-full text-left">
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
