/* 

1. Manga corta o larga: 0, 1 
2. Elige puño: Con botones o para gemelos: 0, 1
3. Con o sin bolsillo: 0, 1
4. Cuello: italiano, francés clásico, abotonado oculto, americano, mao, cubano: 0, 1, 2, 3, 4, 5
*/

interface ShirtImages {
  [key: string]: string;
}

export function generateShirtCombinations(): ShirtImages {
  const shirtImages: ShirtImages = {};

  const sleeveOptions = [0, 1]; // 0: Long sleeve, 1: Short sleeve,
  const cuffOptions = [0, 1]; // 0: With buttons, 1: For cufflinks
  const pocketOptions = [0, 1]; // 0: Without pocket, 1: With pocket
  const collarOptions = [0, 1, 2, 3, 4, 5]; // 0: Italian, 1: Classic French, 2: Hidden button-down, 3: American, 4: Mao, 5: Cuban

  sleeveOptions.forEach((sleeve) => {
    pocketOptions.forEach((pocket) => {
      collarOptions.forEach((collar) => {
        if (sleeve === 1) {
          // If it's short sleeve
          const key = `${sleeve}-0-${pocket}-${collar}`;
          const imageName = `shirt_short_sleeve_cuff_not_applicable_${pocket ? 'with' : 'without'}_pocket_collar_${collar}.jpg`;
          shirtImages[key] = imageName;
        } else {
          // If it's long sleeve
          cuffOptions.forEach((cuff) => {
            const key = `${sleeve}-${cuff}-${pocket}-${collar}`;
            const imageName = `shirt_long_sleeve_cuff_${cuff ? 'cufflinks' : 'buttons'}_${pocket ? 'with' : 'without'}_pocket_collar_${collar}.jpg`;
            shirtImages[key] = imageName;
          });
        }
      });
    });
  });

  return shirtImages;
}
