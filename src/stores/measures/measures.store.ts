import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MeasuresStore = {
  id?: string;
  profile_name: string;
  back: number | undefined;
  chest: number | undefined;
  collar: number | undefined;
  waist: number | undefined;
  hip: number | undefined;
  sleeve_width: number | undefined;
  sleeve_long: number | undefined;
  fist: number | undefined;
  shoulder: number | undefined;
  long: number | undefined;
};

export type MeasuresActions = {
  updateMeasures: (_measures: MeasuresStore) => void;
  resetMeasuresStore: () => void;
};

const initialState: MeasuresStore = {
  id: '',
  profile_name: '',
  back: undefined,
  chest: undefined,
  collar: undefined,
  waist: undefined,
  hip: undefined,
  sleeve_width: undefined,
  sleeve_long: undefined,
  fist: undefined,
  shoulder: undefined,
  long: undefined,
};

export const useMeasures = create<MeasuresStore & MeasuresActions>()(
  persist(
    (set) => ({
      ...initialState,
      updateMeasures: (measures) => set(measures),
      resetMeasuresStore: () => set(initialState),
    }),

    {
      name: 'measures',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
