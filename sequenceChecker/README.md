# React + TypeScript + Vite

npm install
npm run dev

Assumptions:
1. input data is a string with numbers separated by commas
2. The numbers in the array can be any integer.
3. The order of numbers in the array can be arbitrary.

Function execution logic:
1. Transform the input data in an array of numbers
2. The resulting array of numbers is sorted in ascending order.
3. Iterate through the sorted array and find the first missing number, checking the difference between the current and next elements.
4. If a missing number is found, return it, otherwise we will return the next one after the maximum number in the array.

