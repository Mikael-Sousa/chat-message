import Message from "./Message";

export default function Messages() {
  return (
    <section className="messages p-3">
      <Message text="Bom dia!" type="received" />
      <Message text="Bom dia pessoal 👋" type="sent" />
    </section>
  );
}
