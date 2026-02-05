type ChatItemProps = {
  type: "me" | "friend";
  name: string;
  lastMessage: string;
  active?: boolean;
  onClick?: () => void;
};

export function ChatItem({
  type,
  name,
  lastMessage,
  active = false,
  onClick,
}: ChatItemProps) {

  if (type === "me") {
    return (
      <div
        className="chat-item"
        onClick={onClick}
      >
        <strong>{name}</strong>
        <small>{lastMessage}</small>
      </div>
    );
  }

  return (
    <div
      className={`chat-item ${active ? "active" : ""}`}
    >
      <strong>{name}</strong>
      <small>{lastMessage}</small>
    </div>
  );
}
