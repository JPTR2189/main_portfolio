import type { CSSProperties } from "react";
import type { Project } from "../../types";

/** Diagonal blend of a two-app project's colors; `alpha` is a hex suffix such as "20". */
export function accentGradient(project: Project, alpha = ""): string {
  const secondary = project.secondary?.accentColor ?? project.accentColor;
  return `linear-gradient(135deg, ${project.accentColor}${alpha}, ${secondary}${alpha})`;
}

/**
 * Paints `accentGradient` only on an element's padding ring, so a `p-[Npx]`
 * overlay placed over the border becomes an N-pixel gradient border.
 */
export function gradientRingStyle(project: Project): CSSProperties {
  return {
    backgroundImage: accentGradient(project),
    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };
}

/**
 * Project title. When `highlighted`, the trailing `secondary.titlePart` shows the
 * second color with a soft left-to-right sheen; the rest inherits the parent's color.
 *
 * The sheen is a gradient clipped to the text, which can't be transitioned, so the
 * plain and the gradient copies are stacked and cross-faded instead. Swapping the
 * styles on one element left the word transparent for a moment while its color
 * transition caught up.
 */
export function ProjectTitle({
  project,
  highlighted,
}: {
  project: Project;
  highlighted: boolean;
}) {
  const { title, secondary } = project;
  const splitAt = secondary ? title.lastIndexOf(secondary.titlePart) : -1;

  if (!secondary || splitAt < 0) {
    return <>{title}</>;
  }

  return (
    <>
      {title.slice(0, splitAt)}
      <span className="relative inline-block">
        <span
          className="transition-opacity duration-300"
          style={{ opacity: highlighted ? 0 : 1 }}
        >
          {secondary.titlePart}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: highlighted ? 1 : 0,
            backgroundImage: `linear-gradient(90deg, color-mix(in srgb, ${secondary.accentColor} 75%, white), ${secondary.accentColor})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {secondary.titlePart}
        </span>
      </span>
    </>
  );
}
