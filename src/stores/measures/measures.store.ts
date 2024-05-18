import { ShirtMeasure } from '@/utils/types/ShirtMeasure';
import { create } from 'zustand';

export const useMeasures = create<ShirtMeasure>(() => ({
  neck: 0,
  chest: 0,
  waist: 0,
  shoulder: 0,
  left_sleeve: 0,
  right_sleeve: 0,
  left_fist: 0,
  right_fist: 0,
  length: 0,
}));
