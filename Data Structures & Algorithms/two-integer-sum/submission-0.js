class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        /**
         *  Qs
         *  whats the smallest/max lengths of the array?  Array length: 2 to 10^4
         *  whats the range of the integer item of the array?  Array values: -10^9 to 10^9
         *  whats the range of the target integer? Target: -10^9 to 10^9
         *  Will there always be exactly one valid answer? Yes, guaranteed.
         *  Can the same element be used twice? i != j is required.
         */
        /**
         *  Brute force
         *  indices i and j such that nums[i] + nums[j] == target and i != j
         *  condition: nums[i] + nums[j] == target and i != j
         *  loop through the array till we satisfy the condition
         *  which would be O(n^2) for the n number of items in the array
         *  - return array with two valid indices
         */
        // for (let i = 0; i < nums.length; i++) {
        //     for (let j = i + 1; j < nums.length; j++) {
        //         if (i != j && nums[i] + nums[j] === target) {
        //             return [i, j];
        //         }
        //     }
        // }

        /**
         *  optimal design
         *  check if the defference (= target - nums[i]) exists in the hashmap as we iterate through the array.
         *  if not, store it in the hashmap for O(1) look up time
         * 
         *  for an example - nums = [2, 7, 11, 15], target = 9

                i = 0 case 
                difference  ( 7 = 9 - 2) 
                but _diffMap.has(difference) doesn't exist
                _diffMap.set(nums[i], i); -> [2, 0 ] 

                i = 1 case 
                difference  ( 2 = 9 - 7) 
                but _diffMap.has(difference) does exist 
                current index = 1
                return [0,1] 

                Why do you store nums[i] as the key and i as the value, rather than the other way around? 
                 - to avoid key conflicts for duplicate

                 the "check before insert" pattern is critical in hashmap problems. 

                 NFR: if nums had 10 million elements and this was called thousands of times per second in a hot path, what would you change?
                 - To resolve the memory bottleneck (Garbage Collection)  we could use pre-allocated TypedArray to it doesn't trigger the same GC overhead.
                    Sort the array first - memory locality of a sorted array is often faster in modern CPU architectures because of the CPU Cache. you use Two Pointers (left and right) to find the target. This uses O(1) extra space
                    the simplest win is worker threads / task parallelism.

                 Carry forward: whenever you propose a space optimisation, immediately ask yourself "does this problem require me to preserve something that sorting or mutation would destroy?"
                  — indices, original order, stability. That's the trap that catches seniors.

                  
         */

        const _diffMap = new Map();

        for (let i = 0; i < nums.length; i++) {
            const difference = target - nums[i];
            if (_diffMap.has(difference)) {
                return [_diffMap.get(difference), i];
            }
            _diffMap.set(nums[i], i);
        }
    }
}
