"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/src/api/auth.api";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/Button/Button";
import { AuthCard } from "@/src/components/AuthCard/AuthCard";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await loginAPI({
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      router.push("/");

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Erro inesperado");
      }
    }
  };

  return (
    <AuthCard title="Bem-vindo" subtitle="Entre na sua conta">
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

      <Button type="submit" onClick={handleLogin}>Entrar</Button>

      <div className="links">
        <span>Não tem conta?</span>
        <a href="/register"> Cadastrar</a>
      </div>
    </AuthCard>
  );
}
