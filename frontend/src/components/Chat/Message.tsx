type MessageProps = {
  text: string;
  type: "sent" | "received";
};


function Message({ text, type }: MessageProps) {
  return (
    <p className={`msg ${type}`}>
      {text}
    </p>
  );
}

export default Message;

