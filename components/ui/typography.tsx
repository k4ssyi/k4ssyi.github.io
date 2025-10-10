type TypographyVariant = "h1" | "h2" | "p";

interface TypographyProps {
  as?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "font-sans text-6xl tracking-wider",
  h2: "font-sans opacity-75 text-5xl font-thin tracking-wider",
  p: "text-sm",
};

export default function Typography({
  as = "h1",
  className = "",
  children,
}: TypographyProps) {
  const Component = as;
  const styles = variantStyles[as];

  return <Component className={`${styles} ${className}`}>{children}</Component>;
}
