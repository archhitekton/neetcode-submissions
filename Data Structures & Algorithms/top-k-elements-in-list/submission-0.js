class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     * 
     * 
     *  Qs: 
     *  - Can the nums array contain negative numbers? Yes, valid input
     *  - What's the range for the nums length? 1 to 10⁴
     *  - what's the range for items in the nums length? -10⁴ to 10⁴
     *  - What's the minimum k value? 1, maximum k is the number of unique elements
     *  - What's the format of the answer? could it contain anything other than integers? Array of integers, the k most frequent elements
     *  - Is there a guaranteed unique answer? yes 
     * 
     *  Brute force
     *  - build a map and sort the keys by their values to get the frequency k value 
     *  - BigO - T: sorting o(nlogn) and O(n) worth of space 
     *  
     */
    topKFrequent(nums, k) {
        // build a map 
        const itemMap = new Map()

        for (const x of nums){
            // track the frequency by incrementing the counter
            itemMap.set(x, (itemMap.get(x) || 0 ) + 1)
        }
        // nums=[1,2,2,3,3,3]
        // Map(3) { 1 => 1, 2 => 2, 3 => 3 }
        // console.log(itemMap)
        const result = []
        // 2. Extract keys and sort them by their frequency (value) O(n log n)
        // We take the unique numbers and sort based on what is stored in the Map
        const sortedKeys = Array.from(itemMap.keys()).sort((a,b) =>{
            return itemMap.get(b) - itemMap.get(a)
        })
        // console.log(sortedKeys)
        // return the Topk values 
        return sortedKeys.slice(0,k)
        
    }
}
