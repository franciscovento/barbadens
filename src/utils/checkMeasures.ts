import measuresInfo from './data/measures.data';
import { ShirtMeasures } from './types/shirtMeasures.interface';

const checkMeasures = (measures: ShirtMeasures): string[] => {
  const errors: string[] = [];

  Object.keys(measuresInfo).forEach((measure) => {
    const { min, max } = measuresInfo[measure as keyof ShirtMeasures];
    if (
      measures[measure as keyof ShirtMeasures] < min ||
      measures[measure as keyof ShirtMeasures] > max
    ) {
      errors.push(measuresInfo[measure as keyof ShirtMeasures].longDisplayName);
    }
  });

  return errors;
};

export default checkMeasures;
