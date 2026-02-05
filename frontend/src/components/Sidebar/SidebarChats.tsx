import { ChatItem } from "../ChatItem";

type SidebarChatsProps = {
  onOpenProfile: () => void;
};

export default function SidebarChats({ onOpenProfile }: SidebarChatsProps) {
  return (
    <>
      <h4 className="text-pink mb-3">Chats</h4>

      <input
        className="form-control search mb-3"
        placeholder="Pesquisar..."
      />

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
