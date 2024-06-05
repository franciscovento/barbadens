import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CustomShirtState = {
  sleeve: number;
  cuff: number;
  pocket: number;
  collar: number;
};

export type CustomShirtActions = {
  updateSleeve: (_sleeve: number) => void;
  updateCuff: (_cuff: number) => void;
  updatePocket: (_pocket: number) => void;
  updateCollar: (_collar: number) => void;
};

export const useCustomShirt = create<CustomShirtState & CustomShirtActions>()(
  persist(
    (set) => ({
      collar: 0,
      cuff: 0,
      pocket: 0,
      sleeve: 0,
      updateCollar: (collar) => set({ collar: collar }),
      updateCuff: (cuff) => set({ cuff: cuff }),
      updatePocket: (pocket) => set({ pocket: pocket }),
      updateSleeve: (sleeve) => set({ sleeve: sleeve }),
    }),
    {
      name: 'customShirt',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
