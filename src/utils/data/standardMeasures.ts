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
      back: 40,
      chest: 100,
      waist: 90,
      hip: 100,
      long: 70,
      shoulder: 40,
      sleeve_long: 60,
      sleeve_width: 30,
      fist: 20,
      collar: 40,
    },
  },
  {
    name: 'medium',
    short_name: 'M',
    measures: {
      back: 45,
      chest: 110,
      waist: 100,
      hip: 110,
      long: 75,
      shoulder: 45,
      sleeve_long: 65,
      sleeve_width: 35,
      fist: 25,
      collar: 45,
    },
  },
  {
    name: 'large',
    short_name: 'L',
    measures: {
      back: 50,
      chest: 120,
      waist: 110,
      hip: 120,
      long: 80,
      shoulder: 50,
      sleeve_long: 70,
      sleeve_width: 40,
      fist: 30,
      collar: 50,
    },
  },
  {
    name: 'extra large',
    short_name: 'XL',
    measures: {
      back: 55,
      chest: 130,
      waist: 120,
      hip: 130,
      long: 85,
      shoulder: 55,
      sleeve_long: 75,
      sleeve_width: 45,
      fist: 35,
      collar: 55,
    },
  },
];
