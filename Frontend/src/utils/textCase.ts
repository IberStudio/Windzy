export function toCamelCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .split(/[\s_-]+/) // split by space, dash, underscore
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}