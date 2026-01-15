type ChatItemProps = {
  name: string;
  lastMessage: string;
  active?: boolean;
};

export function ChatItem({ name, lastMessage, active }: ChatItemProps) {
  return (
    <div className={`chat-item ${active ? "active" : ""}`}>
        <strong>{name}</strong>
        <span>{lastMessage}</span>
    </div>
  );
}
