/*
Assumptions:
1. input data is a string with numbers separated by commas
2. The numbers in the array can be any integer.
3. The order of numbers in the array can be arbitrary.

Function execution logic:
1. Transform the input data in an array of numbers
2. The resulting array of numbers is sorted in ascending order.
3. Iterate through the sorted array and find the first missing number, checking the difference between the current and next elements.
4. If a missing number is found, return it, otherwise we will return the next one after the maximum number in the array.
*/

export function findMissingNumber(input: string): number {
    const numbers = parseStringToNumbers(input) ?? [];
    const sortedNumbers = numbers.sort((a, b) => a - b);
    console.log(sortedNumbers);
    
    for (let i = 0; i < sortedNumbers.length - 1; i++) {
        if (sortedNumbers[i + 1] - sortedNumbers[i] > 1) {
            return sortedNumbers[i] + 1;
        }
    }

    return sortedNumbers[sortedNumbers.length - 1] + 1;
}

export function parseStringToNumbers(input: string): number[] | undefined {
    const numbers: number[] = [];
    const numberStrings = input.split(',').map(str => str.trim());

    numberStrings.forEach(str => {
        const num = Number(str);
        if (!isNaN(num)) {
            if (num >= 0) {
                Number.MAX_SAFE_INTEGER - 1 < num ? numbers.push(0) : numbers.push(num);
            } else {
                Number.MIN_SAFE_INTEGER + 1 > num ? numbers.push(-1) : numbers.push(num);
            }
        }
    });

    return numbers;
}
