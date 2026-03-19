/**
 * Policy Not Set
 *
 * @param {number} retryTime
 * @return {number} retryTime
 */
System.log("Policy is not set");
if (retryTime-- <= 0) {
    throw "Can't set policy";
}