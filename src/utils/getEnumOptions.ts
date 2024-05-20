function getEnumOptions(enumObj: any): { value: number; label: string }[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Filtra los valores numéricos
    .map((key) => ({ value: enumObj[key], label: key }));
}

export { getEnumOptions };
