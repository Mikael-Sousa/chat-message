"use client";

import Image from "next/image";
import { getMeAPI } from "@/src/api/user.api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SidebarProfileProps = {
  onBack: () => void;
};

type MeResponse = {
  username: string;
  avatarUrl?: string;
};

export default function SidebarProfile({ onBack }: SidebarProfileProps) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await getMeAPI(token);
        setUser(res.data);
      } catch (err) {
        console.error("Erro ao buscar perfil", err);
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, []);

  if (loading) {
    return <div className="text-center text-muted">Carregando perfil...</div>;
  }

  if (!user) {
    return <div className="text-center text-danger">Erro ao carregar perfil</div>;
  }

  return (
    <div className="h-100 d-flex flex-column">

      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-sm btn-outline-light me-2"
          onClick={onBack}
        >
          ←
        </button>
        <h5 className="mb-0">Meu perfil</h5>
      </div>

      <div className="text-center">
        <Image
          src={user.avatarUrl || "/avatar-default.png"}
          alt="Avatar"
          width={120}
          height={120}
          className="rounded-circle mb-3"
        />

        <h6>@{user.username}</h6>
      </div>

      <div className="mt-4">
        <button 
        className="btn btn-outline-danger w-100"
        onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
        }}
        >
          Sair
        </button>
      </div>

    </div>
  );
}
