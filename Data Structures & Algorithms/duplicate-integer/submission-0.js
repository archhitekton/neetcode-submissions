class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     * 
     * 
     *  
     *  [1,2,3,3] -> T
     *  [1,2,3,4] -> F 
     *  [3,2,1,3] -> T - Yes, if any value appears more than once
     * 
     *  Edge cases 
     *  - empth array -> F
     *  - contains a negative numbers -> dosen't affect the logic  
     *  - size range? -> helps determine if O(n log n) is acceptable
     * 
     *  T/S Complexities 
     *  T - O(n) n number of items in an array - worse case 
     * 
     *  hashing key 
     * set 
     *  
     */


    /**
     *  Brute force approach 
     *  basically we compare every element against every other element in the array
     *  T/S complexity - O(n^2) for n number of elements 
     * 
     *  Optimal Solution is hashset 
     *  if the item is seen in the set return T else F 
     *  T/S complexity - O(n) for n number of elements 
     * 
     *  One liner optimisation approach 
     *  convert the array into a set if the length differs then return T else F 
     *  
     */

    hasDuplicate(nums) {
        /**
         * Optimal approach 
         * 
         * */
        const _set = new Set(nums)
        return _set.size != nums.length


        // Brute force approach 
        // let _numslen = nums.length;
        // for (let i = 0; i < _numslen; i++) {
        //     for (let k = i+1; k < _numslen; k ++){
        //         if (nums[i] === nums[k] ) return true
                
        //     }
        
        // }
        // return false 

        /**
         * NFR
         * if nums had 10 million elements and duplicates were rare, 
         * which approach would you recommend in production and why?
         *  
         * what's the memory implication? - 

        * Ram memory would be the bottleneck - consume 400MB to 1GB of RAM. in this case n would be 10mil, memory overhead is the bottleneck

        *  rare duplicate problem: whole 9.9m `nums` would be a cache in this case to find the duplicates
        * sorting & scan of `nums` would be ideal - sort the array in place first
        * Sort the array first and iterate once to see if `nums[i] === nums[i-1]`
        * `O(1)` auxiliary space 
        * Bloom filters? tolerate a tiny margin of error. Extremely memory efficient. 
        * 10 million elements could be handled in a few megabytes rather than hundreds.
        */


    }
}
