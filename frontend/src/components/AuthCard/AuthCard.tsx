type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}
