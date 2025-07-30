function factorialIterative(n) {
  if (n < 0) return undefined; // Factorial is undefined for negative numbers

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}


-----------------------------------------------


function factorialRecursive(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}