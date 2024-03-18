import { PalindromeChecker } from './index';

describe('palindrome checker', () => {
  let palindromeChecker: PalindromeChecker;

  beforeEach(() => {
    palindromeChecker = new PalindromeChecker();
  });

  describe('words', () => {
    it.each(['mom', 'wow'])('knows that "%s" is a valid palindrome', (word) => {
      const result = palindromeChecker.isAPalindrome(word);

      expect(result).toBeTruthy();
    });

    it.each(['bill', 'library', 'book'])(
      'knows that "%s" is an invalid palindrome',
      (word) => {
        const result = palindromeChecker.isAPalindrome(word);

        expect(result).toBeFalsy();
      }
    );
  });

  describe('casing is off', () => {
    it.each([
      'Mom',
      'DAD',
      'WoW',
      'MoM',
      'xMomx',
      'NEVER Odd oR Even',
      'Was It A RAT I SaW',
    ])('knows that "%s" is a valid palindrome', (word) => {
      const result = palindromeChecker.isAPalindrome(word);

      expect(result).toBeTruthy();
    });
  });

  describe('phrases', () => {
    it.each(['Was It A Rat I Saw', 'Never Odd or Even', '1Never Odd or Even1'])(
      'knows that "%s" is a valid palindrome',
      (phrase) => {
        const result = palindromeChecker.isAPalindrome(phrase);

        expect(result).toBeTruthy();
      }
    );

    it('knows that "Never Odd or Even1" is an invalid palindrome', () => {
      const phrase = 'Never Odd or Even1';
      const result = palindromeChecker.isAPalindrome(phrase);
      expect(result).toBeFalsy();
    });
  });
});
