"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAPI } from "@/src/api/auth.api";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/Button/Button";
import { AuthCard } from "@/src/components/AuthCard/AuthCard";
import "./styles.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleRegister = async () => {
        try {
            const res = await registerAPI({
                username,
                email,
                password,
            });

            console.log(res);
            router.push("/login");

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("Erro inesperado");
            }
        }
    };


    return (
        <AuthCard title="Criar conta" subtitle="Preencha seus dados">
            <Input
                label="Usuário"
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Input
                label="Email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={handleRegister}>
                Cadastrar
            </Button>

            <div className="links">
                <span>Já tem conta?</span>
                <a href="/login"> Entrar</a>
            </div>
        </AuthCard>
    );
}
