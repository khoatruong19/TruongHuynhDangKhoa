const sumToN = (n, calculation) => {
    const isPositiveInteger = Number.isInteger(n) && n > 0;
    if(!isPositiveInteger) return 0
    
    return calculation(n)
}

const sumByIterative = (n) => {
    let sum = 0
    for (let i = 1; i <= n; i++) {
            sum += i
    }
    return sum
};

const sumByProgressionFormula = (n) => {
    return (n*(n+1)) / 2
};

const sumByRecursive = (n) => {
    return n <= 1 ? n : sumByRecursive(n - 1);
};

const resultA = sumToN(5, sumByIterative);
const resultB = sumToN(5, sumByProgressionFormula);
const resultC = sumToN(5, sumByRecursive);

console.log(resultA); // Output: 15
console.log(resultB); // Output: 15
console.log(resultC); // Output: 15