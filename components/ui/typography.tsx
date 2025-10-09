type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TypographyProps {
  as?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "font-sans text-6xl tracking-wider",
  h2: "font-sans opacity-75 text-5xl font-thin tracking-wider",
  h3: "font-sans text-4xl tracking-wide",
  h4: "font-sans text-3xl tracking-wide",
  h5: "font-sans text-2xl tracking-wide",
  h6: "font-sans text-xl tracking-wide",
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
