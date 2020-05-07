const formatValue = (value: number): string =>
  new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default formatValue;
