import { Description } from './types/webDescription.interface';

const generateAttributes = (items: Description[]) => {
  const attr = items
    .filter((it) => it.html !== '')
    .map((item) => {
      return { title: item.descriptionName, value: item.html };
    });

  return attr;
};

export { generateAttributes };
