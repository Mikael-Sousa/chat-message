export default function ChatInput() {
  return (
    <footer className="p-3 d-flex gap-2">
      <input
        className="form-control input-msg"
        placeholder="Mensagem"
      />
      <button className="btn btn-pink">➤</button>
    </footer>
  );
}
