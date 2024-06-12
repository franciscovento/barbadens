import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MeasuresStore = {
  id?: string;
  profile_name: string;
  back: number | null | undefined;
  chest: number | null | undefined;
  collar: number | null | undefined;
  waist: number | null | undefined;
  hip: number | null | undefined;
  sleeve_width: number | null | undefined;
  sleeve_long: number | null | undefined;
  fist: number | null | undefined;
  shoulder: number | null | undefined;
  long: number | null | undefined;
};

export type MeasuresActions = {
  updateMeasures: (_measures: MeasuresStore) => void;
  resetMeasuresStore: () => void;
  updateProfileId: (_id: string) => void;
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
      updateProfileId: (id) => set({ id }),
    }),

    {
      name: 'measures',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
