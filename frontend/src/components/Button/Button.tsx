type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({ children, onClick, type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="btn-login">
      {children}
    </button>
  );
}
