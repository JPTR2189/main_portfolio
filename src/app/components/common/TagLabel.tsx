import { Fragment } from "react";

interface TagLabelProps {
  tag: string;
}

/**
 * Renders a project tag inside an uppercased container while keeping the "i" of
 * any "iOS" occurrence lowercase — so "iOS App" reads as "iOS APP" and
 * "App iOS" reads as "APP iOS", never "IOS".
 */
export function TagLabel({ tag }: TagLabelProps) {
  const parts = tag.split(/(iOS)/i);

  return (
    <>
      {parts.map((part, index) =>
        /^iOS$/i.test(part) ? (
          <Fragment key={index}>
            <span style={{ textTransform: "lowercase" }}>{part[0]}</span>
            {part.slice(1)}
          </Fragment>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
