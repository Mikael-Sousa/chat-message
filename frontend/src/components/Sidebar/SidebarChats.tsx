import { useState } from "react";
import { Input } from "../Input/Input";
import { ChatItem } from "../ChatItem"

type SidebarChatsProps = {
  onOpenProfile: () => void;
  onOpenUser: (username: string) => void;
};;

export default function SidebarChats({
  onOpenProfile,
  onOpenUser,
}: SidebarChatsProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) return;

    onOpenUser(name);
    setName("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label=""
          placeholder="Pesquisar usuário..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <div className="chat-list">
        <ChatItem
          type="me"
          name="Meu Perfil"
          lastMessage="Toque para detalhes"
          active
          onClick={onOpenProfile}
        />

        <ChatItem
          type="friend"
          name="Grupo IFMaker"
          lastMessage="Bom dia pessoal"
        />

        <ChatItem
          type="friend"
          name="Maria Gabriela"
          lastMessage="Feliz ano novo"
        />
      </div>
    </>
  );
}