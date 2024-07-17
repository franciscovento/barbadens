const getCurrencyFormat = (number: number) => {
  let pen = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });

  return pen.format(number);
};

export { getCurrencyFormat };
