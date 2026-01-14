import "./Sidebar.css";
import ChatItem from "../ChatItem";

export default function Sidebar() {
  return (
    <>
      <h4 className="text-pink mb-3">Chats</h4>

      <input
        className="form-control search mb-3"
        placeholder="Pesquisar..."
      />

      <div className="chat-list">
        <ChatItem
          name="Grupo IFMaker"
          lastMessage="Bom dia pessoal"
          active
        />
        <ChatItem
          name="Maria Gabriela"
          lastMessage="Feliz ano novo"
        />
      </div>
    </>
  );
}
