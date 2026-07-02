export function toCamelCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .split(/[\s_-]+/) 
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

export const capitalizeWords = (phrase: string): string => {
  if (!phrase) return "";
  return phrase
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};