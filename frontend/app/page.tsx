"use client";

import "../src/components/Sidebar/Sidebar.css";
import { useState } from "react";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import SidebarChats from "../src/components/Sidebar/SidebarChats";
import SidebarProfile from "../src/components/Sidebar/SidebarProfile";
import Chat from "../src/components/Chat/Chat";

function App() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <ProtectedRoute>
      <div className="container-fluid vh-100 p-0 bg-dark">
        <div className="row g-0 h-100">

          <aside className="col-12 col-md-4 col-lg-3 p-3 sidebar">
            {showProfile ? (
              <SidebarProfile onBack={() => setShowProfile(false)} />
            ) : (
              <SidebarChats onOpenProfile={() => setShowProfile(true)} />
            )}
          </aside>

          <main className="col-md-8 col-lg-9 d-none d-md-flex flex-column chat">
            <Chat />
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;
