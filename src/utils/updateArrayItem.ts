const updateArrayItem = <T, K extends keyof T>(
  array: T[],
  newItem: T,
  keys: K[]
): T[] => {
  const newArray = array.map((element) => {
    const isElement = keys.every((k) => element[k] === newItem[k]);
    if (isElement) {
      return newItem;
    }
    return element;
  });
  return newArray;
};

export { updateArrayItem };
