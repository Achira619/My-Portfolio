// components/ui/Tag.jsx

export default function Tag({ children, color }) {
  return (
    <span
      className="tag"
      style={color ? { color, borderColor: `${color}33` } : undefined}
    >
      {children}
    </span>
  );
}
