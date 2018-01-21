import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const formatTime = (time, format) =>
  moment(time).format(format || DATE_FORMAT);

export const calculateDifferenceInDays = (a, b) =>
  (console.log(a, b), moment(b).diff(moment(a), 'days'));

export const formatPercent = value => value.toFixed(2);
