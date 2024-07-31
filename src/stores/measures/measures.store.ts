import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MeasuresStore = {
  back: number | undefined;
  chest: number | undefined;
  collar: number | undefined;
  long: number | undefined;
  shoulder: number | undefined;
  sleeve_long: number | undefined;
  sleeve_width: number | undefined;
  waist: number | undefined;
};

export type MeasuresActions = {
  setMeasures: (data: MeasuresStore) => void;
  getMeasures: () => MeasuresStore;
  clearMeasures: () => void;
};

const initialState: MeasuresStore = {
  back: undefined,
  chest: undefined,
  collar: undefined,
  long: undefined,
  shoulder: undefined,
  sleeve_long: undefined,
  sleeve_width: undefined,
  waist: undefined,
};

export const useMeasures = create<MeasuresStore & MeasuresActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      getMeasures: () => {
        const obj: MeasuresStore = {} as MeasuresStore;
        for (const key in initialState) {
          obj[key as keyof typeof initialState] =
            get()[key as keyof typeof initialState];
        }
        return obj;
      },
      clearMeasures: () => {
        set(initialState);
      },
      setMeasures: (data) => set(data),
    }),
    {
      name: 'measures',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
