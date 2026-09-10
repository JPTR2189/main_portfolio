/** Smoothly scrolls the page to the section with the given element id. */
export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}
