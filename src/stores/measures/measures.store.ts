import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Measures = {
  profileName: string | undefined;
  long: number | undefined;
  collar: number | undefined;
  chest: number | undefined;
  waist: number | undefined;
  hip: number | undefined;
  back: number | undefined;
  sleeveWidth: number | undefined;
  sleeveLong: number | undefined;
  fist: number | undefined;
  shoulder: number | undefined;
};

export type MeasuresActions = {
  updateMeasures: (_measures: Measures) => void;
};

const initialState: Measures = {
  collar: undefined,
  chest: undefined,
  waist: undefined,
  shoulder: undefined,
  sleeveWidth: undefined,
  sleeveLong: undefined,
  fist: undefined,
  long: undefined,
  back: undefined,
  hip: undefined,
  profileName: undefined,
};

export const useMeasures = create<Measures & MeasuresActions>()(
  persist(
    (set) => ({
      ...initialState,
      updateMeasures: (measures) => set(measures),
    }),
    {
      name: 'measures',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
