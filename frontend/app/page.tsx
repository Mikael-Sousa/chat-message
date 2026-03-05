"use client";

import "../src/components/Sidebar/Sidebar.css";
import { useState } from "react";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import SidebarChats from "../src/components/Sidebar/SidebarChats";
import SidebarProfileMe from "../src/components/Sidebar/SidebarProfileMe";
import SidebarProfileUsers from "../src/components/Sidebar/SidebarProfileUsers";
import Chat from "../src/components/Chat/Chat";

function App() {
  const [title, setTitle] = useState("Chats")
  const [view, setView] = useState<"chats" | "profileMe" | "profileUser">("chats");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <ProtectedRoute>
      <div className="container-fluid vh-100 p-0 bg-dark">
        <div className="row g-0 h-100">
          <aside className="col-12 col-md-4 col-lg-3 p-3 sidebar">

            <h4 className="text-pink mb-3">{title}</h4>
            {view === "chats" && (
              <SidebarChats
                onOpenProfile={() => {
                  setView("profileMe");
                  setTitle("Perfil")
                }
                }
                onOpenUser={(username) => {
                  setSelectedUser(username);
                  setView("profileUser");
                  setTitle("Perfil")
                }}
              />
            )}

            {view === "profileMe" && (
              <SidebarProfileMe onBack={() => {
                setView("chats");
                setTitle("Chats")
              }} />
            )}

            {view === "profileUser" && selectedUser && (
              <SidebarProfileUsers
                username={selectedUser}
                onBack={() => {
                  setView("chats");
                  setTitle("Chats")
                }}
              />
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