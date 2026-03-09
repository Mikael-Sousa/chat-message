"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getUsersAPI } from "../../api/user.api"
import { sendFriendRequestAPI, findFriendRequestAPI } from "../../api/friend.api"

type SidebarUserProfileProps = {
    username: string;
    onBack: () => void;
};

type User = {
    id: number;
    username: string;
    avatarUrl?: string;
};

export default function SidebarUserProfile({
    username,
    onBack,
}: SidebarUserProfileProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [textStatusRequest, setTextStatusRequest] = useState("Enviar solicitação")

    const checkRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !user) return;

            const res = await findFriendRequestAPI({
                token,
                friendRequest: {
                    receiverId: user.id,
                },
            });

            if (res.status === 201) {
                setTextStatusRequest("Enviado");
            }

        } catch (err) {
            console.error(err);
        }
    };

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

    useEffect(() => {
    if (user) {
        checkRequest();
    }
}, [user]);

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
                    onClick={async () => {
                        setTextStatusRequest("Enviado")
                        try {
                            const token = localStorage.getItem("token");
                            if (!token || !user) return;

                            await sendFriendRequestAPI({
                                token,
                                friendRequest: {
                                    receiverId: user.id,
                                },
                            });

                        } catch (err) {
                            console.error(err);
                        }
                    }}
                >
                    {textStatusRequest}
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