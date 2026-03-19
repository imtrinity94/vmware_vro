/**
 * Demonstrates the usage of Moment.js with Timezone support within vRO.
 * This action requires the com.test.momentjs module to be pre-installed.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Initialize Moment instance and Timezone plugin
var moment = System.getModule("com.test.momentjs").getMomentInstance();
var momentTZ = System.getModule("com.test.momentjs").getMomentTZ(moment);

// Define a sample UTC timestamp
var sampleUtcDateStr = "2021-09-23T23:13:58.166554Z";
var d = moment(sampleUtcDateStr);

// Log output in local/default format
System.log("Original Time (UTC): " + d.format());

// Convert and log in specific timezone
var laTime = d.tz("America/Los_Angeles").format("L, LTS");
System.log("America/Los_Angeles Time: " + laTime);
