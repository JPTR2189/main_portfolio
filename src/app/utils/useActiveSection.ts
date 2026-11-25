import { useEffect, useState } from "react";

/** Id of the section crossing the middle of the screen; empty when it has none (like the hero). */
export function useActiveSection(): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main > section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
