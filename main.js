// Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

// Example 1:
// Input: 
// n = 10 
// ["call","call","call"]
// Output: [10,11,12]
// Explanation: 
// counter() = 10 // The first time counter() is called, it returns n.
// counter() = 11 // Returns 1 more than the previous time.
// counter() = 12 // Returns 1 more than the previous time.

// Example 2:
// Input: 
// n = -2
// ["call","call","call","call","call"]
// Output: [-2,-1,0,1,2]
// Explanation: counter() initially returns -2. Then increases after each sebsequent call.


/////// first attempt /////////
var createCounter = function (n) {
  return function () {
    return n++                                    /////had to fiddle around a bit but closure is really hard to understand...
  };                                            /////I think I'll understand it more when I see a real case of why it matters
};


// const counter = createCounter(10)
// console.log(counter()) // 10
// console.log(counter()) // 11
// console.log(counter()) // 12
// const nextCounter = createCounter(30);
// console.log(nextCounter())
// console.log(nextCounter())
// console.log(nextCounter())

// You are climbing a staircase. It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:

// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:

// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step


// Constraints:

// 1 <= n <= 45

function howManyCombos(n) {
  let answers = []
  let maxTwos = Math.floor(n / 2)

  function sum(array) {
    return array.reduce((acc, cv) => acc + cv, 0)
  }

  function getOnesAndTwos(array) {
    return array.reduce((acc, cv) => {
      cv === 1 ? acc[1] += 1 : acc[2] += 1
      return acc
    }, { 1: 0, 2: 0 })
  }

  function getFactorial(num) {
    let factorial = num
    if (num === 0 || num === 1) {
      return 1
    }
    while (num > 1) {
      num--
      factorial *= num
    }
    return factorial
  }

  while (maxTwos >= 0) {
    const currentAnswer = []
    for (let i = 0; i < maxTwos; i++) {
      currentAnswer.push(2)
    }
    while (sum(currentAnswer) < n) {
      currentAnswer.push(1)
    }
    answers.push(currentAnswer)
    maxTwos -= 1
  }

  let totalPossibilities = 0
  answers.forEach((answer) => {
    let onesFactorial = getFactorial(getOnesAndTwos(answer)[1])
    let twosFactorial = getFactorial(getOnesAndTwos(answer)[2])
    let totalLengthFactorial = getFactorial(answer.length)
    totalPossibilities += totalLengthFactorial / (onesFactorial * twosFactorial)
  })

  return totalPossibilities
}

console.log(countByTwos(8))