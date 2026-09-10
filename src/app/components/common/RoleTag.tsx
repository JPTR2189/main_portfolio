interface RoleTagProps {
  role: string;
}

/** Blue rounded pill used to highlight a role played in a project. */
export function RoleTag({ role }: RoleTagProps) {
  return (
    <div
      className="inline-flex items-center px-4 py-2 rounded-full text-sm"
      style={{
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(59, 130, 246, 0.3)",
        color: "#93C5FD",
      }}
    >
      <span>{role}</span>
    </div>
  );
}
