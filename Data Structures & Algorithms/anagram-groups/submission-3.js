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
         *  Brute force
         *   
         *  sort the strs by the lenght of each items - as anagaram tends to be same length
         *  we gonna use use the previous anagram detection logic here to return a boolean -> isAnagram(_str1, _str2)
         *  
         *  strs = ["act","pots","tops","cat","stop","hat"]
         *  strs.sort((a,b) =>  a.length - b.length )
         *  sortedStr = ["act","cat","hat", "pots","stop", "tops"]
         *  
         *  
         *  maintain an array called visited to track of booleans the same size as strs, all set to false.
         * 
         *  Nested Loops:
         *  outter loop -> Outer Loop (i): If strs[i] is already visited, continue.
         *  - if not, Create a new Group: Start a list with strs[i] and mark i as visited.
         *  inner loop 
         *  - fail fast if the items length differes  
         *  - otherwise j = i+ 1 till the str.length loop 
         *  - if not viited and isAnagram then 
         *  we add strs[j] to the currGroup array then mark as visited 
         *  exit inner loop 
         *  push the currGroup to result array
         * exit outterloop return result 
         * 
         *  T/S complexity - o(n^2.k) space complexity is o(n) n number of items 
         *  sort - o(nlogn) -> timesort or merge sort
         *  for -> o(n)
         *      isAnagram -> o(n) 
         *  -- o(n^2) for k numer of items 
         *  
    
         */

        // sort the strs by the lenght of each items - as anagaram tends to be same length
        strs.sort((a,b) =>  a.length - b.length )
        const result = []
        // maintain an array called visited to track of booleans the same size as strs, all set to false.
        const visited = new Array(strs.length).fill(false);

        for (let i = 0; i < strs.length; i++){
            if (visited[i]){
                continue
            }
            // if not, Create a new Group: Start a list with strs[i] and mark i as visited.
            const currGroup = [strs[i]]
            visited[i] = true

            for (let j = i+1; j < strs.length ; j++ ){
                // fail fast if the length differs
                // since the array is sorted by length, the moment you hit a different length all subsequent j elements will also be longer.  
                if (strs[i].length !== strs[j].length){
                    break 
                }

                if(!visited[j] && isAnagram(strs[i], strs[j])){
                    currGroup.push(strs[j])
                    visited[j] = true
                }
            }
            result.push(currGroup);
        }

        return result 

        

    }
}
