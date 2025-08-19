export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function normalizeText(str) {
  return str.toLowerCase().trim();
}
