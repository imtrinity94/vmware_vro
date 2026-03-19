/**
 * @description Creates Active Directory Sub Organizational Units (OUs) if they do not already exist.
 *              Specifically ensures "Groups", "Computers", and "Servers" sub-OUs exist under a target parent OU.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {string} Status message.
 */

/**
 * Creates an Active Directory Sub Organizational Unit (OU) if it does not already exist.
 * @param {ActiveDirectory:OrganizationalUnit} item The parent OU object to create the sub OU under.
 * @param {string} substring The name of the sub OU to create.
 */
function performOuCreation(item, substring) {
    try {
        // Attempt to create the sub OU
        item.createOrganizationalUnit(substring);
        System.log("Sub OU '" + substring + "' created successfully.");
    } catch (e) {
        System.error("Error creating Sub OU '" + substring + "': " + e.message);
    }
}

// Main execution logic
var parentOuPath = "MGMT"; // Example: "Epic"

// Search for the parent OU
var foundOus = ActiveDirectory.search('OrganizationalUnit', parentOuPath);
System.log("Parent OU search result: " + foundOus);

if (foundOus.length > 0) {
    // Extract child OUs from the first parent OU
    var childOuList = foundOus[0].organizationalUnits;

    // Build a string of existing sub OU names
    var existingSubOusStr = "";
    var i;
    for (i = 0; i < childOuList.length; i++) {
        var ouObj = childOuList[i];
        existingSubOusStr += ouObj.name + ":";
        System.log("Existing OU Name: " + ouObj.name);
    }
    System.log("Existing Sub OUs: " + existingSubOusStr);

    // Define the required sub OU names
    var requiredSubOuNames = ["Groups", "Computers", "Servers"];

    // Check and create missing sub OUs
    var j;
    for (j = 0; j < requiredSubOuNames.length; j++) {
        var requiredName = requiredSubOuNames[j];
        if (existingSubOusStr.indexOf(requiredName) !== -1) {
            System.log("Sub OU '" + requiredName + "' exists.");
        } else {
            System.log("Sub OU '" + requiredName + "' does not exist. Creating...");
            var parentOuMatch = ActiveDirectory.searchExactMatch('OrganizationalUnit', parentOuPath);

            if (parentOuMatch.length > 0) {
                var k;
                for (k = 0; k < parentOuMatch.length; k++) {
                    performOuCreation(parentOuMatch[k], requiredName);
                }
            }
        }
    }
    System.log("All required Sub OUs exist!");
    return "All Sub OUs exist!";
} else {
    System.log("Parent OU '" + parentOuPath + "' not found");
    return "Parent OU '" + parentOuPath + "' not found";
}
