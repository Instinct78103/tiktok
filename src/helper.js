export function getTimeOnly(date) {

  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  const d = new Date(date);
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());

  return h + ':' + m;
}

export function timeSince(date) {
  const intervals = [
    {label: 'y', seconds: 31536000},
    {label: 'm', seconds: 2592000},
    {label: 'd', seconds: 86400},
    {label: 'h', seconds: 3600},
    {label: 'm', seconds: 60},
    {label: 's', seconds: 1},
  ];

  const d = new Date(date);

  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count}${interval.label} ago`;
}

export function dFormat(num, digits) {
  const lookup = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(item => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}
