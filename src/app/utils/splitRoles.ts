/** Splits a combined role string ("iOS Developer & Scrum Master") into individual roles. */
export function splitRoles(combinedRoles: string): string[] {
  return combinedRoles
    .split(/\s*[&,]\s*/)
    .map((role) => role.trim())
    .filter(Boolean);
}
