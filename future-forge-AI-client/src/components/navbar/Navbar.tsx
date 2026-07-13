import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Roadmap", path: "/roadmap" },
    { label: "Tech Groups", path: "/techNetworkGroups" },
    { label: "Portal", path: "/portal" },
    { label: "Future Vision", path: "/future-vision" },
  ];

  const isActive = (path: string) => location.pathname === path;


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setShowUserMenu(false);
  };

  const getUserName = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.firstName || userData.name || userData.email || "User";
    }
    return "User";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div  className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/dashboard")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
            Future Forge
          </span>
        </div>

        {/* Center Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive(item.path) ? "bg-slate-800 text-purple-400 border border-purple-500/30" : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
              }`}>{item.label}
            </button>
          ))}
        </div>

        {/* Right Side: User Avatar + Logout */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)} title={getUserName()}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center 
              justify-center text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition" >
              {getUserName()[0].toUpperCase()}
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800">
                  <p className="text-sm text-slate-400">Signed in as</p>
                  <p className="text-white font-medium">{getUserName()}</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition text-sm">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition text-sm">
                  Settings
                </button>
                <div className="border-t border-slate-800">
                  <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-800 transition text-sm font-medium">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
