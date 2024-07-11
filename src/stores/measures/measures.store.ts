import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MeasuresStore = {
  back: number | undefined;
  chest: number | undefined;
  collar: number | undefined;
  fist: number | undefined;
  hip: number | undefined;
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
  fist: undefined,
  hip: undefined,
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
        return {
          back: get().back,
          chest: get().chest,
          collar: get().collar,
          fist: get().fist,
          hip: get().hip,
          long: get().long,
          shoulder: get().shoulder,
          sleeve_long: get().sleeve_long,
          sleeve_width: get().sleeve_width,
          waist: get().waist,
        };
      },
      clearMeasures: () => {
        set({
          back: undefined,
          chest: undefined,
          collar: undefined,
          fist: undefined,
          hip: undefined,
          long: undefined,
          shoulder: undefined,
          sleeve_long: undefined,
          sleeve_width: undefined,
          waist: undefined,
        });
      },
      setMeasures: (data) =>
        set({
          back: data.back,
          chest: data.chest,
          collar: data.collar,
          fist: data.fist,
          hip: data.hip,
          long: data.long,
          shoulder: data.shoulder,
          sleeve_long: data.sleeve_long,
          sleeve_width: data.sleeve_width,
          waist: data.waist,
        }),
    }),
    {
      name: 'measures',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
