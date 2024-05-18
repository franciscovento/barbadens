import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Measures = {
  neck: number;
  chest: number;
  waist: number;
  shoulder: number;
  left_sleeve: number;
  right_sleeve: number;
  left_fist: number;
  right_fist: number;
  length: number;
};

export type MeasuresActions = {
  updateMeasures: (_measures: Measures) => void;
};

export const useMeasures = create<Measures & MeasuresActions>()(
  persist(
    (set) => ({
      neck: 0,
      chest: 0,
      waist: 0,
      shoulder: 0,
      left_sleeve: 0,
      right_sleeve: 0,
      left_fist: 0,
      right_fist: 0,
      length: 0,
      updateMeasures: (measures) => set(measures),
    }),
    {
      name: 'customShirt',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
