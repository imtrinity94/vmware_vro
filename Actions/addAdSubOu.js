/**
 * Creates an Active Directory Sub Organizational Unit (OU) if it does not already exist.
 * @param {object} item The parent OU object to create the sub OU under.
 * @param {string} substring The name of the sub OU to create.
 * @returns {void}
 */
function performAction(item, substring) {
    try {
        // Attempt to create the sub OU
        item.createOrganizationalUnit(substring);
        System.log("Sub OU '" + substring + "' created successfully.");
    } catch (e) {
        System.error("Error creating Sub OU '" + substring + "': " + e.message);
    }
}

/**
 * Main execution function
 */
function main() {
    // Set the parent OU value (e.g., application name)
    var parentOU = "MGMT"; // Example: "Epic"

    // Search for the parent OU
    var ous = ActiveDirectory.search('OrganizationalUnit', parentOU);
    System.log("Parent OU search result: " + ous);

    if (ous.length > 0) {
        // Extract child OUs from the first parent OU
        var childOUs = ous[0].organizationalUnits;

        // Build a string of existing sub OU names
        var subOUs = "";
        for (var i = 0; i < childOUs.length; i++) {
            var ouObject = childOUs[i];
            subOUs += ouObject.name + ":";
            System.log("Existing OU Name: " + ouObject.name);
        }
        System.log("Existing Sub OUs: " + subOUs);

        // Define the required sub OU names
        var subOUNames = ["Groups", "Computers", "Servers"];

        // Check and create missing sub OUs
        for (var j = 0; j < subOUNames.length; j++) {
            var substring = subOUNames[j];
            if (subOUs.indexOf(substring) !== -1) {
                System.log("Sub OU '" + substring + "' exists.");
            } else {
                System.log("Sub OU '" + substring + "' does not exist. Creating...");
                var parentOUObject = ActiveDirectory.searchExactMatch('OrganizationalUnit', parentOU);

                if (parentOUObject.length > 0) {
                    for (var k = 0; k < parentOUObject.length; k++) {
                        performAction(parentOUObject[k], substring);
                    }
                }
            }
        }
        System.log("All required Sub OUs exist!");
        return "All Sub OUs exist!";
    } else {
        System.log("Parent OU '" + parentOU + "' not found");
        return "Parent OU '" + parentOU + "' not found";
    }
}

// Execute the main function
main();
