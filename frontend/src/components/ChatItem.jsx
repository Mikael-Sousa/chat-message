export default function ChatItem({ name, lastMessage, active }) {
  return (
    <div className={`chat-item ${active ? "active" : ""}`}>
      <strong>{name}</strong>
      <small>{lastMessage}</small>
    </div>
  );
}
