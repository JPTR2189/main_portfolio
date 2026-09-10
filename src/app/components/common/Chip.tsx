interface ChipProps {
  label: string;
}

/** Small rounded pill used to display technologies and skills. */
export function Chip({ label }: ChipProps) {
  return (
    <div
      className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#171717] border border-[#262626] text-xs text-[#A3A3A3]"
      style={{ fontWeight: 500 }}
    >
      <span>{label}</span>
    </div>
  );
}
