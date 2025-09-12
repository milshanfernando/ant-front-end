import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "./components/layout/SideBar";
import MobileMenu from "./components/layout/MobileMenu";
import "./App.css";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <div className="hidden md:flex">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col relative">
        <div className="flex justify-end md:hidden p-4 z-30">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 flex flex-col justify-between items-center"
          >
            <span
              className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-3" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            ></span>
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-black/80 md:hidden">
            <MobileMenu />
          </div>
        )}

        <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
