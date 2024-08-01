import { ShirtMeasures } from '../types/shirtMeasures.interface';

interface StandardMeasures {
  name: string;
  short_name: string;
  measures: ShirtMeasures;
}

export const standardMeasures: StandardMeasures[] = [
  {
    name: 'small',
    short_name: 'S',
    measures: {
      collar: 41,
      chest: 50,
      waist: 48,
      long: 68,
      back: 41,
      sleeve_long: 61,
      sleeve_width: 18,
      shoulder: 15,
    },
  },
  {
    name: 'medium',
    short_name: 'M',
    measures: {
      collar: 43.5,
      chest: 54,
      waist: 52,
      long: 72,
      back: 43,
      sleeve_long: 63,
      sleeve_width: 19,
      shoulder: 15,
    },
  },
  {
    name: 'large',
    short_name: 'L',
    measures: {
      collar: 46,
      chest: 57,
      waist: 54,
      long: 74,
      back: 45,
      sleeve_long: 64,
      sleeve_width: 20,
      shoulder: 16,
    },
  },
  {
    name: 'extra large',
    short_name: 'XL',
    measures: {
      collar: 49,
      chest: 61,
      waist: 58,
      long: 78,
      back: 47,
      sleeve_long: 66,
      sleeve_width: 21,
      shoulder: 16,
    },
  },
];
