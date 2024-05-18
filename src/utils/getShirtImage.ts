import { generateShirtCombinations } from './typeOfShirts';

export function getShirtImage(
  sleeve: number,
  cuff: number,
  pocket: number,
  collar: number
): string | undefined {
  const shirtImages = generateShirtCombinations();
  const key = `${sleeve}-${cuff}-${pocket}-${collar}`;
  return shirtImages[key];
}
