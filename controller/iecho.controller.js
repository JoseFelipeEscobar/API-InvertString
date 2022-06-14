/**
 * Controllers
 * @module iecho-controller
 */

/**
 * this function invert the input string and show if this is a palindrome
 * @function
 * @name invertString
 * @query {string} text - input string
 * @param {Todo} req - req object
 * @body {string} inverted text
 * @body {boolean} ispalindrome response
 * @param {object} res - A object promise, will be a object
 * on code 200, a errors object on code 400 and an object 
 * with message error on code 500
 * @code {200} If the input string is created
 * @response {object} res - A success message object
 * @code {400} If the req have errors (bad request)
 * @respose {errors} res - A errors object array
 * @code {500} If an internal error happen
 * @response {message} res - A error message if an error happens on server
 */
const invertString = (req, res, next) => {
  /**
   * A tstring with alphabuneric value
   * @type {string}
   * @default ""
   */
  let { text } = req.query;

  try {
    //validate that user send at least 2 characters
    if (text === "" || text.lenght < 2) {
      return res.status(400).json({
        error: "no text",
      });
    }

    /**
     * function to clean and organize the input string and lowercase the
     * string. Use RexEXP to remove unwanted characters in the input string.
     * @param {string} text is the string that sends the user by req
     * @returns a string with only alphanumeric characters
     */
    const normalizeStr = (string) => {
      const re = /[\W_]/g; // or let re = /[^A-Za-z0-9]/g;
      return string.toLowerCase().replace(re, "");
    };

    /**
     * function that inverts the previously normalized string
     * @param {string} text
     * @returns  returns a string with inverted text
     */
    const reverseStr = (text) => {
      //first normalize, second split the string, invert it,
      //and then join the string.
      return normalizeStr(text).split("").reverse().join("");
    };
    /**
         *bolean value that compares the normalized string with the inverted 
         string to see if it is a palindrome.
         * @type {boolean}
         */
    const isPalindrome = reverseStr(text) === normalizeStr(text);
    /**
         
    * response object with inverted character string and palindrome verification
    * @type {object}
    */
    let response = {
      text: reverseStr(text),
      palindrome: isPalindrome,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      error: "no text",
    });
  }
};

module.exports = { invertString };
