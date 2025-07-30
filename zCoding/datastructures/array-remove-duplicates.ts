const unique = [...new Set(numbers)];

const unique = numbers.filter((value, index, self) => self.indexOf(value) === index);

function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];

  for (const value of arr) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }

  return result;
}

----------

function removeDuplicatesByKey(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
];

console.log(removeDuplicatesByKey(users, 'id'));
// Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
