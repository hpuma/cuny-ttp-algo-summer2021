// Problem Statement #

// Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to recreate the array.

// The flag of the Netherlands consists of three colors: red, white and blue; and since our input array also consists of three different numbers that is why it is called Dutch National Flag problem.

// Precondion: Array of 0,1,2s that are treated as objects
// Postcondion: No return value , just sort the array in place
// NOTE: Did not use 2 pointers technique :c
const dutch_flag_sort = function (arr) {
  const arrSize = arr.length; // Storing the length of the array and referencing it later on
  if(!arrSize) return; // Empty arraySum
  const valueCount = {};// O(1)
  let i = 0;// O(1)
  for(i = 0; i < arrSize; i++){ // O(n) : n: length of the array
    valueCount[arr[i]] = !valueCount[arr[i]] ? 1 : valueCount[arr[i]] + 1;
  }
  let totalNumbers = 0; // O(1)
  i = 0;
  const sortedValues = Object.keys(valueCount).sort((a,b) => {a-b}); // All distinct keys that are sorted
  // Total run time O(n) <=> O(kc)
  for (const number in sortedValues){ // O(k): k: the number of distinct keys => our case O(3) : 0, 1 ,2
      totalNumbers = i + valueCount[number];
      while(i < totalNumbers){ // O(c): c => count of each key of 0,1, or 2  0 <= c <= n
        arr[i] = number;
        i+=1;
      }
  }
  return
};
  // 
  /* 
    arr: [1, 2, 1, 0, 1]
    number = 0
    totalNumbers = 5
    numbersAdded = 0
    while(0 < 5 ) 
      valueCount = {
        0: 1,
        1: 3,
        2: 1,
      };
    arr: [1, 2, 1, 0, 1] becomes => [0, 1 ,1, 1, 2]
    number = 0 -> 1 -> 2 iteration
    totalNumbers =  i + valueCount[number]
    numbersAdded = 0
    while(0 < 1 -> 3 -> 1 iteration)
   */

// Runtime : O(2n + nlogn) ~= O(nlogn)
// Space complexity: O(3)

let arr = [1, 2, 1, 0, 0]; // [0, 0, 1 , 1, 2]
dutch_flag_sort(arr);
console.log(arr);

arr = [2, 2, 0, 1, 2, 0]; // [0, 0, 1, 2, 2, 2]
dutch_flag_sort(arr);
console.log(arr);

// Solution
// -----
// function dutch_flag_sort(arr) {
//   // all elements < low are 0, and all elements > high are 2
//   // all elements from >= low < i are 1
//   let low = 0,
//     high = arr.length - 1,
//     i = 0;
//   while (i <= high) {
//     if (arr[i] === 0) {
//       [arr[i], arr[low]] = [arr[low], arr[i]]; // swap
//       // increment 'i' and 'low'
//       i += 1;
//       low += 1;
//     } else if (arr[i] === 1) {
//       i += 1;
//     } else { // the case for arr[i] === 2
//       [arr[i], arr[high]] = [arr[high], arr[i]]; // swap
//       // decrement 'high' only, after the swap the number at index 'i' could be 0, 1, or 2
//       high -= 1;
//     }
//   }
// }

// -----

// Time complexity #
// The time complexity of the above algorithm will be O(N) as we are iterating the input array only once.

// Space complexity #
// The algorithm runs in constant space O(1).
