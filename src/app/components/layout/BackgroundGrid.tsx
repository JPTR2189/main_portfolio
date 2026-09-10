/** Subtle fixed grid rendered behind the whole page. */
export function BackgroundGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  );
}
