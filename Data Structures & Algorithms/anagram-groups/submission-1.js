class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
        /**
         *  Qs
         *  - can there be an empty strs?  strs can contain empty strings "" — valid input
         *  - what's the range for strs.length? strs.length: 1 to 10^4
         *  - What would be the output for a single item in strs?  Single item → return it wrapped in a group, e.g. [["eat"]]
         *  - What is the range for strs[i].length? strs[i].length: 0 to 100
         *  - Can there be uppercase items in the strs?  Lowercase English letters only
         *  - can the output be empty or empty string? Output will always have at least one group
         *  - what's the expected output order? You may return the output in any order.
         */

        const isAnagram = (s, t) => {
            // fail fast scenario - O(1)
            // not an anagram
            if (s.length !== t.length) return false;

            // valid use-case
            // hashmap to keep track of the strings
            const anagramChecker = new Map();

            for (let char of s) {
                // add all the chars of s into the map
                // if the key doesn't exists then set to 0, otherwise increment by 1
                anagramChecker.set(char, (anagramChecker.get(char) || 0) + 1);
            }
            // process t
            for (let char of t) {
                // key must exists otherwise fail fast
                // One thing to carry forward — when we use get on a Map and the key might not exist,
                //always ask yourself what undefined arithmetic looks like. ?? is your friend.
                const newCounter = (anagramChecker.get(char) ?? 0) - 1;

                if (newCounter < 0) return false; // not anagram

                anagramChecker.set(char, newCounter);
            }
            return true;
        };

        /**
         * Optimal solution 
         * - If two words are anagrams, they contain the same characters with the same frequencies. There are two primary ways to create a signature:
         * - Sorting each string: "eat", "tea", and "ate" all become "aet" Sorting takes O(k log k).
         * - Character Counting (Frequency Map) -> Create an array of 26 integers representing the count of each letter 'a' through 'z'. 
         *  "abb" becomes [1, 2, 0, 0, ...]. This takes O(k)
         *  
    
         */
        const groups = new Map()

        for ( const s of strs){
            // 1. Generate the signature by sorting the characters
            // O(k log k) per string
            const sig = s.split('').sort().join('')

            // 2. Group the original string
            if (!groups.has(sig)){
                groups.set(sig, [])
            }
            groups.get(sig).push(s)
        }
    
        // 3. Return the grouped results
        return Array.from(groups.values()) 

    }
}
