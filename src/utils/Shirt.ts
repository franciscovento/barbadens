interface ShirtImages {
  [key: string]: string;
}

class Shirt {
  constructor(
    public sleeve: number = 0,
    public collar: number = 0,
    public cuff: number = 0,
    public pocket = 0
  ) {}

  get key(): string {
    return `${this.sleeve}-${this.cuff}-${this.pocket}-${this.collar}`;
  }

  get imageName(): string {
    if (this.sleeve === 1) {
      return `shirt_short_sleeve_cuff_not_applicable_${this.pocket ? 'with' : 'without'}_pocket_collar_${this.collar}.jpg`;
    } else {
      return `shirt_long_sleeve_cuff_${this.cuff ? 'cufflinks' : 'buttons'}_${this.pocket ? 'with' : 'without'}_pocket_collar_${this.collar}.jpg`;
    }
  }

  static generateShirtCombinations(): ShirtImages {
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

  public getShirtImage(): string | undefined {
    const shirtImages = Shirt.generateShirtCombinations();
    const key = `${this.sleeve}-${this.cuff}-${this.pocket}-${this.collar}`;
    return shirtImages[key];
  }
}

export default Shirt;
