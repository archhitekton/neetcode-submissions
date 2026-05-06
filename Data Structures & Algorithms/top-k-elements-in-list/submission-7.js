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
     *  Optimal design
     * Reduce Big O from O(nlogn) to O(n) complexity for both time and space
     * Bucket Sort is actually the gold standard for Top K Frequent Elements specifically, because it guarantees $O(n)$ time and is highly intuitive.
     *  without a sorting algo?
     *
     */
    topKFrequent(nums, k) {
        // build a map
        const itemMap = new Map();
        // Populate Buckets: Iterate through your Map
        for (const x of nums) {
            itemMap.set(x, (itemMap.get(x) || 0) + 1);
        }
        if (itemMap.size === 1) return Array.from(itemMap.keys());

        // Shortcut: exit fast if the map length is equal to k
        if (itemMap.size === k) return Array.from(itemMap.keys());

        // Create Buckets: Create an array of empty lists, where the length of the array is nums.length + 1.
        // The index represents the frequency.
        // e.g index 3 will hold all numbers that appeared exactly 3 times.
        const buckets = Array.from({ length: nums.length + 1 }, () => []);

        // 2. Fill Buckets: Index is the frequency
        // buckets[3] = [3], buckets[2] = [5, 4], buckets[1] = [1]
        for (const [num, freq] of itemMap) {
            buckets[freq].push(num);
        }
        // console.log(buckets);
        // 3. Collect the top K from the end of the buckets
        const result = [];
        for (let x = buckets.length - 1; x >= 0 && result.length < k; x--) {
            if (buckets[x].length > 0) {
                result.push(...buckets[x]);
            }
        }
        return result.slice(0, k);
    }
}
