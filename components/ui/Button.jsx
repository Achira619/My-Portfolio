// components/ui/Button.jsx
import Link from "next/link";

/**
 * variant: "green" | "cyan" | "ghost"
 * href: optional – renders an <a> via Next Link
 * onClick: optional
 */
export default function Button({
  children,
  variant = "green",
  href,
  onClick,
  className = "",
  style,
  ...rest
}) {
  const variantClass =
    variant === "green" ? "btn-green"
    : variant === "cyan" ? "btn-cyan"
    : "btn-ghost";

  const classes = `btn ${variantClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} style={style} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} style={style} {...rest}>
      {children}
    </button>
  );
}
