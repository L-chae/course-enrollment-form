export const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`badge-brand inline-flex items-center rounded-sm font-bold uppercase tracking-wider text-[10px] px-2 py-1 ${className}`}>
    {children}
  </span>
);