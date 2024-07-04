import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SleeveType = 'manga corta' | 'manga larga';

export interface ShirtDesign {
  sleeve_type: SleeveType;
  shirt_cuff_id?: number | null;
  shirt_collar_id: number;
  shirt_pocket_id: number;
}

export type ShirtDesignActions = {
  updateSleeveType: (_sleeve: SleeveType) => void;
  updateCuffId: (_cuff: number) => void;
  setCuffToNull: () => void;
  updatePocketId: (_pocket: number) => void;
  updateCollarId: (_collar: number) => void;
};

const initialState: ShirtDesign = {
  shirt_cuff_id: 1,
  shirt_collar_id: 1,
  shirt_pocket_id: 1,
  sleeve_type: 'manga larga',
};

export const useCustomShirt = create<ShirtDesign & ShirtDesignActions>()(
  persist(
    (set) => ({
      ...initialState,
      updateCollarId: (collar) => set({ shirt_collar_id: collar }),
      updateCuffId: (cuff) => set({ shirt_cuff_id: cuff }),
      updatePocketId: (pocket) => set({ shirt_pocket_id: pocket }),
      updateSleeveType: (sleeve) => set({ sleeve_type: sleeve }),
      setCuffToNull: () => set({ shirt_cuff_id: null }),
    }),
    {
      name: 'design',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
