function getCharsFromStrings(arrOfStrings) {

    /*
    * join(' ') will make the array as a string like:
    * 'hello world this is a test this is an example'
    * */
    const chars = arrOfStrings.join(' ');

    /*
    * I set each char as key in the object,
    * in this case, I have unique keys cause the next duplicated key will override the previous one.
    * So we will have an Obj like: { h:'', e:'', l:'', o:'', ' ':'', w:'', r:'', d:'', t:'', i:'', s:'', a:'', n:'', x:'', m:'', p:''}
    *  */
    const charsObj = {};
    for (const char of chars) {
        charsObj[char] = '';
    }

    /*
    * Returning the keys of the Obj which should be:
    *  ['h', 'e', 'l', 'o', ' ', 'w', 'r', 'd', 't', 'i', 's', 'a', 'n', 'x', 'm', 'p']
    * */
    return Object.keys(charsObj);

}

console.log('The result is:', getCharsFromStrings(['hello world', 'this is a test', 'this is an example']));

/*

* Also, We can use the Set Object like the following function,
* and actually its faster than my code but to be honest I used the above way before I know about Set Class:
*
    * function getCharsFromStrings(arrOfStrings) {
    *   const chars = arrOfStrings.join(' ').split('');
    *   return [...new Set(chars)];
    * }
*
* Set Object, from MDN doc:
*   The Set has method checks if a value is in a Set object,
*   using an approach that is, on average,
*   quicker than testing most of the elements
*   that have previously been added to the Set object.
*   In particular, it is, on average,
*   faster than the Array.prototype.includes method when an Array object has a length equal to a Set object’s size.
*/

/*
*   * This another way to return unique values but I assumed that it's complexity is more than my way
*      cause in filter we're looping n times and in indexOf we have another loop, so each loop has another loop:
*     * function getCharsFromStrings(arrOfStrings) {
        * const chars = arrOfStrings.join(' ').split('');
        * let uniqueChars = chars.filter((c, index) => {
        *     return chars.indexOf(c) === index;
        * });
        * return uniqueChars;
      *}
* */