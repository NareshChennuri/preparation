const pad = (n: number) => String(n).padStart(2, '0');

// Inside your loop
const occRRuleFormat =
  `${occ.getUTCFullYear()}${pad(occ.getUTCMonth() + 1)}${pad(occ.getUTCDate())}` +
  `T${pad(occ.getUTCHours())}${pad(occ.getUTCMinutes())}${pad(occ.getUTCSeconds())}Z`;

if (occ > todayUTC && !exDateSet.has(occRRuleFormat)) {
  nextValidDate = occ;
  exDateSet.add(occRRuleFormat); // ✅ Add in RRULE format
  break;
}
