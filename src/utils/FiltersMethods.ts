import moment from 'moment';

export const numberToString = (number: number, nbDecimal = 2) => {
  if (!nbDecimal) nbDecimal = 2;

  if (!number) return '';
  else return Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(number);
};

export const numberToStringEvenZero = (number: number, nbDecimal = 2) => {
  if (!nbDecimal) nbDecimal = 2;

  if (!number) return '0';
  else return Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(number);
};

export const dateToString = (dateTime: Date | string, format = 'DD/MM/YYYY') => {
  if (!dateTime) return '';
  return moment(dateTime).format(format);
};

export const typeDeviseDisplay = (value: string) => {
  if (value == '') return value;

  return value == 'E' ? 'Entier' : 'Décimal';
};
