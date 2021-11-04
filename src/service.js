// export function parseISOString(s) {
//   const b = s.split(/\D+/);
//   return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
// }

export function parseISOString(s) {
  const dt = s.split(/[: T-]/).map(parseFloat);
  return `${dt[0]}-${dt[1]}-${(dt[2] < 10 ? '0' + dt[2] : dt[2]) || 0}, ${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
  // return `${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
}
