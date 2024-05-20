/* 

1. Manga corta o larga: 0, 1 
2. Elige puño: Con botones o para gemelos: 0, 1
3. Con o sin bolsillo: 0, 1
4. Cuello: italiano, francés clásico, abotonado oculto, americano, mao, cubano: 0, 1, 2, 3, 4, 5
*/

import { getEnumOptions } from './getEnumOptions';
import { Collar, Cuff, Pocket, Sleeve } from './types/Shirt.enum';

interface ShirtImages {
  [key: string]: string;
}

const sleeveOptions = getEnumOptions(Sleeve); // 0: Long sleeve, 1: Short sleeve,
const cuffOptions = getEnumOptions(Cuff); // 0: With buttons, 1: For cufflinks
const pocketOptions = getEnumOptions(Pocket); // 0: Without pocket, 1: With pocket
const collarOptions = getEnumOptions(Collar); // 0: Italian, 1: Classic French, 2: Hidden button-down, 3: American, 4: Mao, 5: Cuban

export function generateShirtCombinations(): ShirtImages {
  const shirtImages: ShirtImages = {};

  sleeveOptions.forEach((sleeve) => {
    pocketOptions.forEach((pocket) => {
      collarOptions.forEach((collar) => {
        if (sleeve.value === Sleeve['Manga corta']) {
          // If it's short sleeve
          const key = `${sleeve.value}-0-${pocket.value}-${collar.value}`;
          const imageName = `shirt_short_sleeve_cuff_not_applicable_${pocket.value === Pocket.with ? 'with' : 'without'}_pocket_collar_${collar.label}.jpg`;
          shirtImages[key] = imageName;
        } else {
          // If it's long sleeve
          cuffOptions.forEach((cuff) => {
            const key = `${sleeve.value}-${cuff.value}-${pocket.value}-${collar.value}`;
            const imageName = `shirt_long_sleeve_cuff_${cuff.value === Cuff.cuffLink ? 'cufflinks' : 'buttons'}_${pocket.value === Pocket.with ? 'with' : 'without'}_pocket_collar_${collar.label}.jpg`;
            shirtImages[key] = imageName;
          });
        }
      });
    });
  });

  return shirtImages;
}
