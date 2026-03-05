type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      {label && <label>{label}</label>}

      <input
        className="form-control search mb-3"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}