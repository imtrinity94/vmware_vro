/**
 * Simple task with custom script capability.
 *
 * @param {number} count
 * @param {Array/string} ipRanges
 * @return {string} attrCurrentIpRange
 */
if (count >= ipRanges.length)
{
    throw "No other placement is available in Network Profile";
}
else{
    attrCurrentIpRange = ipRanges[count];
    System.log(attrCurrentIpRange)
}