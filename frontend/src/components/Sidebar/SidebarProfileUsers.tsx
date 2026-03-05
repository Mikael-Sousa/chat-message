"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsersAPI } from "../../api/user.api"

type SidebarUserProfileProps = {
    username: string;
    onBack: () => void;
};

type User = {
    username: string;
    avatarUrl?: string;
};

export default function SidebarUserProfile({
    username,
    onBack,
}: SidebarUserProfileProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await getUsersAPI(username);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [username]);

    if (loading) {
        return <div className="text-center text-muted">Carregando perfil...</div>;
    }

    if (!user) {
        return (
            <div className="h-100 d-flex flex-column">
                <div className="text-center">
                    <Image
                        src={"/icon-user.png"}
                        alt="Avatar"
                        width={120}
                        height={120}
                        className="rounded-circle mb-3"
                    />

                    <h6 className="text-danger">Não encontrado</h6>
                </div>

                <div className="mt-4 d-grid gap-2">


                    <button
                        className="btn btn-outline-secondary"
                        onClick={onBack}
                    >
                        Voltar
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="h-100 d-flex flex-column">
            <div className="text-center">
                <Image
                    src={user.avatarUrl || "/icon-user.png"}
                    alt="Avatar"
                    width={120}
                    height={120}
                    className="rounded-circle mb-3"
                />

                <h6>@{user.username}</h6>
            </div>

            <div className="mt-4 d-grid gap-2">

                <button
                    className="btn btn-outline-primary"
                    onClick={() => router.push("")}
                >
                    Enviar solicitação
                </button>

                <button
                    className="btn btn-outline-secondary"
                    onClick={onBack}
                >
                    Voltar
                </button>

            </div>
        </div>
    );
}