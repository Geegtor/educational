import { parseStringToNumbers, findMissingNumber} from "./helpers";

describe('parseStringToNumbers', () => {
    test('should return an array of numbers when input is valid', () => {
        expect(parseStringToNumbers('1, 2, 3, 4')).toEqual([1, 2, 3, 4]);
    });

    test('should ignore non-numeric values and return only numbers', () => {
        expect(parseStringToNumbers('1, a, 2, b, 3')).toEqual([1, 2, 3]);
    });

    test('should handle negative numbers and spaces', () => {
        expect(parseStringToNumbers('-1, -2, -3')).toEqual([-1, -2, -3]);
        expect(parseStringToNumbers(' 1, -2, 3 ')).toEqual([1, -2, 3]);
    });

    test('should return an empty array if no valid numbers are found', () => {
        expect(parseStringToNumbers('a, b, c')).toEqual([]);
    });
});


describe('findMissingNumber', () => {
    test('should return the missing number in a sequence', () => {
        expect(findMissingNumber('1, 2, 4')).toBe(3);
        expect(findMissingNumber('5, 3, 2, 6, 1')).toBe(4);
        expect(findMissingNumber('10, 7, 5, 4, 6, 8, 9')).toBe(11);
    });

    test('should handle edge cases with smallest and largest possible numbers', () => {
        expect(findMissingNumber('-1')).toBe(0);
        expect(findMissingNumber('1')).toBe(2);
        expect(findMissingNumber('1, 2, 3')).toBe(4);
        expect(findMissingNumber(String(Number.MAX_SAFE_INTEGER))).toBe(1);
        expect(findMissingNumber(String(Number.MIN_SAFE_INTEGER))).toBe(0);
    });
});

