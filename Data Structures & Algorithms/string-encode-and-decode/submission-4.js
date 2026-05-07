class Solution {
    /**
     * Clarifying Questions & Answers
     *
     * Q: How is an example input structured?
     * A: ["neet","code","love","you"] → encode to single string → decode back to ["neet","code","love","you"]
     *
     * Q: What's the length range of strs?
     * A: 0 to 100
     *
     * Q: What's the length range of strs[i]?
     * A: 0 to 200
     *
     * Q: What are the valid possible characters in strs[i]?
     * A: Any of the 256 valid ASCII characters — including special characters like #, /, |
     *    CRITICAL: Cannot use a simple delimiter — it may appear in the input itself
     *    e.g. ["hello#world", "test"] encoded as "hello#world#test#"
     *    decodes incorrectly as ["hello", "world", "test"] — data corruption
     * 
     * Brute force 
    - input ["Hi","My","Hello#World"] 
    we perform prefix based encoding [Length][Delimiter][Content] strategy like length of the string to avoid the ambiguity 
    - decoder will get "2#Hi2#My11#Hello#World"
    - loop through the strs to build the encoded_string 
    - encoder can run in o(n) and space complexity would be o(n) n being the number of items in the arr
    - loop to go through the strs with a global encoded_string to append based on the length and delimiter 
    -  decorder 
    - loop though the encoded_string and split by length reapply strategy to produce the verctor strings
    -  since we know the length of the string upfront we split based on it. 
    - time complexity O(string.length * delimiter.length)
     */

    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        if (strs.length == 0) {
            return "";
        }
        let encoded_string = "";
        for (const i of strs) {
            const _strLength = i.length;
            const base = _strLength + "#" + i;
            // encoded_string = 2#Hi2#hi
            // [Length][Delimiter][Content]
            encoded_string = encoded_string + base;
        }
        // console.log(encoded_string)
        // "5#Hello5#World"
        return encoded_string;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        if (str == "") {
            return [];
        }
        // "5#Hello5#World"
        // [Length][Delimiter][Content]
        // we need two pointers to keep track of what we looking in the string
        // 1. find the # - delimiter from the starting position of i
        const strArr = [];
        let i = 0;

        while (i < str.length) {
            let j = i;
            while (str[j] !== "#") {
                j++;
            }
            // 2. The characters between i and j are our length!
            // str.substring(0, 2) for "12#..." gives us "12"
            let len = parseInt(str.substring(i, j));
            // console.log(len)
            // 3. move i to the start of the actual content (right after thr #)
            i = j + 1;
            // 4. Slice the string from i for exactly 'length' char
            let content = str.substring(i, i + len);
            // console.log(content)
            strArr.push(content);

            // 5. move i to the start of the next length-prefix
            i = i + len;
        }

        return strArr;
    }
}
