class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        /**
         * "what would make this problem behave differently than I expect?" 
         * 
         *  what are the clarifying questions? 
         *  Input constraints
         * - large, empty, single string inputs, nulls?
         * - can the two strings be different lengths? no, it won't be an anagram wouldn't it - return early
         *  Output behaviour
         * - returns a boolean
         * Assumptions about the problem domain 
         * - Can I perform modification of the inputs? No
         * - case sensertive or ASCII only?  
         */

        /**
         *  Brute force 
         *   - sort the strings and check if they are equal, this would be o(nlogn + mlogm)
         */

        // const _sortedS = [...s].sort().toString()
        // const _sortedT = [...t].sort().toString()

        // return _sortedS === _sortedT

        /**
         *  Optimal Approach
         *  
         * As we assume the arrays are equal, we would do a quick check in the beginning to rule out the edge cases, O(1) op to fail fast
         * In the brute force we were rearranging the items in the arrays, the optimal solution we would use a hashmap with a fix size integer arrays to count length so we could bring the complexity down to O(m+n) - leaner time
         * On time complexity - we move from Log-linear to Linear, removing the O(log n) overhead. 
         * Sorting requires comparing elements against each other repeatedly. 
         * In the optimal approach, you only visit each character exactly once to update its count in the Hash Map.
         * One optimisation - we can def use one map for tracking the two strings, one use to increment and other to decrement the counter. If we find a negative number in the hashmap then it's not anagram 
         * Reduced Memory: You store 1 times 26 integers instead of 2 times 26.
         *  - 
         */

        // fail fast scenario - O(1) 
        // not an anagram
        if (s.length !== t.length) return false

        // valid use-case 
        // hashmap to keep track of the strings 
        const anagramChecker = new Map()

        for (let char of s){
            // add all the chars of s into the map
            // if the key doesn't exists then set to 0, otherwise increment by 1 
            anagramChecker.set(char,(anagramChecker.get(char) || 0) + 1 )
        }
        // process t 
        for (let char of t){
            // key must exists otherwise fail fast 
            if (!anagramChecker.has(char)){
                return false // not an anagram
            }
            const newCounter = anagramChecker.get(char) - 1 

            if (newCounter < 0 ) return false // not anagram

            anagramChecker.set(char,newCounter)
        }
        return true 

    }
}
