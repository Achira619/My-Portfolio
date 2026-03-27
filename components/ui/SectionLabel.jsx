// components/ui/SectionLabel.jsx

export default function SectionLabel({ children, center = false }) {
  return (
    <div
      className="section-label"
      style={center ? { justifyContent: "center" } : undefined}
    >
      {children}
    </div>
  );
}
