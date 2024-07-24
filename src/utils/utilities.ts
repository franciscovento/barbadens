const getFormatPostDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getFormatPostTime = (date: string) => {
  // get date on pm/am format
  return new Date(date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export { getFormatPostDate, getFormatPostTime };
