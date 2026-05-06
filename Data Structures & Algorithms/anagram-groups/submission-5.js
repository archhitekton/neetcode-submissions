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

        /**
         * Optimal solution
         * - If two words are anagrams, they contain the same characters with the same frequencies. There are two primary ways to create a signature:
         * - Sorting each string: "eat", "tea", and "ate" all become "aet" Sorting takes O(k log k).
         * - Character Counting (Frequency Map) -> Create an array of 26 integers representing the count of each letter 'a' through 'z'.
         *  "abb" becomes [1, 2, 0, 0, ...]. This takes O(k)
         *
         *  NFR: if `strs` had 1 million strings averaging 50 characters each, and this ran as a hot API endpoint, what would you change?
         *  
            BOEC: 1M strings × 50 chars × 2 bytes storage, I would avoid String Splitting: This would definitely blocks the event loop in JS.
            String splitting blocking event loop — correct concern. split('').sort().join('') on 1M strings is CPU-intensive synchronous work. 
            Node.js single-threaded event loop will stall under that load.

            Uint8Array for counts — good call. Fixed 26-byte array per string vs dynamic object allocation. Eliminates GC pressure per-string entirely.

            Parallelization (Worker Threads) with local maps then merge - we can partition the array strs into chunks. Worker threads with local maps then merge - Key-Based Concatenation, Instead of re-processing strings, the main thread performs a "shallow merge" by iterating over the keys of the worker maps.
            or we would avoid the main thread merge entirely by using Consistent Hashing before sending data to workers

            Event-driven over REST : Kafka - The server (or a fleet of workers) picks up the task, processes the anagrams, and emits a "ProcessingComplete" event. It prevents timeout errors and allows you to scale the number of consumers (workers) based on the size of the queue.
         */
        const groups = new Map();

        for (const s of strs) {
            // 1. Generate the signature by sorting the characters
            // O(k log k) per string
            const sig = s.split("").sort().join("");

            // 2. Group the original string
            if (!groups.has(sig)) {
                groups.set(sig, []);
            }
            groups.get(sig).push(s);
        }

        // 3. Return the grouped results
        return Array.from(groups.values());
    }
}
