export default function ChatHeader() {
  return (
    <header className="chat-header d-flex align-items-center justify-content-between px-4 py-3">
      <div className="d-flex align-items-center gap-3">
        <div className="avatar">IF</div>

        <div>
          <h6 className="mb-0 text-white">Grupo IFMaker</h6>
          <small className="status">online</small>
        </div>
      </div>
    </header>
  );
}
