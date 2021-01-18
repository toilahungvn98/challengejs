// Problem 1 C
// Task: Provide 3 unique implementations of the following function.
// Input: `n` - any integer from `0` to `Number.MAX_SAFE_INTEGER`.
// Output: `return` - summation to `n`, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.

var sum_to_n = function (n) {
  // your code here
  let arr = []
  for (let i = 0; i <= n; i++) {
    arr.push(i)
  }
  return arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
  }, 0)
}

console.log(sum_to_n(5))
