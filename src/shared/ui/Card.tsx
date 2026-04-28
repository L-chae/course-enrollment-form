interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export const Card = ({ children, interactive, className = "" }: CardProps) => {
  return (
    <div className={`
      ${interactive ? "card-interactive" : "card"} 
      bg-bg-card rounded-md overflow-hidden ${className}
    `}>
      {children}
    </div>
  );
};