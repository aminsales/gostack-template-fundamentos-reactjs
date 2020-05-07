const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('pt').format(new Date(date));
export default formatDate;
