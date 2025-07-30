A prime number is a number greater than 1 that is only divisible by 1 and itself.
Examples: 2, 3, 5, 7, 11 are prime.
4, 6, 8, 9 are not.

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const sqrt = Math.sqrt(n);
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}