/**
 * Validate
 *
 * @param {Array/string} recipients - [object Object]
 */
if (!recipients || recipients.length ==0) {
	throw "[Invalid Param] Email address not provided.";
}