export default function Message({ text, type }) {
  return <div className={`msg ${type}`}>{text}</div>;
}
