//"listen" and "silent" → ✅ Anagrams
//"hello" and "world" → ❌ Not anagrams

function isAnagram(str1, str2) {
  const normalize = str =>
    str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');

  return normalize(str1) === normalize(str2);
}

----

function isAnagram(str1, str2) {
  const clean1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const clean2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (clean1.length !== clean2.length) return false;

  const count = {};

  for (let char of clean1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of clean2) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}
