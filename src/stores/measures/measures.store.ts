import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Measures = {
  neck: number | undefined;
  chest: number | undefined;
  waist: number | undefined;
  shoulder: number | undefined;
  left_sleeve: number | undefined;
  right_sleeve: number | undefined;
  left_fist: number | undefined;
  right_fist: number | undefined;
  length: number | undefined;
};

export type MeasuresActions = {
  updateMeasures: (_measures: Measures) => void;
};

const initialState: Measures = {
  neck: undefined,
  chest: undefined,
  waist: undefined,
  shoulder: undefined,
  left_sleeve: undefined,
  right_sleeve: undefined,
  left_fist: undefined,
  right_fist: undefined,
  length: undefined,
};

export const useMeasures = create<Measures & MeasuresActions>()(
  persist(
    (set) => ({
      ...initialState,
      updateMeasures: (measures) => set(measures),
    }),
    {
      name: 'customShirt',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
