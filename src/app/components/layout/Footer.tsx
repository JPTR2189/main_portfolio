export function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <p className="text-sm text-[#525252]">
          © {new Date().getFullYear()} Jean Pierre
        </p>
      </div>
    </footer>
  );
}
