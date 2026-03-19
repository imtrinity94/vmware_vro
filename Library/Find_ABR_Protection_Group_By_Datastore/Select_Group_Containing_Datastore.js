/**
 * Select Group Containing Datastore
 *
 * @param {Array/SRM:ProtectionGroup} allProtectionGroups
 * @param {VC:Datastore} datastore
 * @return {Array/SRM:ProtectionGroup} abrProtectionGroups
 * @return {Array/SRM:ProtectionGroup} allProtectionGroups
 */
/* Copyright (c) 2014-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */

/* Iterate over protection groups and their protected datastores
   until we find the protection groups that contain the datastore
   of interest */
System.log("allProtectionGroups.length = " + allProtectionGroups.length)
abrProtectionGroups = [];
var countAbrPGs = 0;
for(var i=0; i < allProtectionGroups.length; i++) {
	var pg = allProtectionGroups[i];
	System.log("pg.name = " + pg.name + ", pg.replicationType = " + pg.replicationType)
	if (pg.replicationType == 'san') { // ABR groups only

		try {
			var pds = pg.getProtectedDatastore();
			System.log("pds.length = " + pds.length)
			for(var j=0; j <= pds.length; j++) {
				var pd = pds[j];
				System.log("pd.name = " + pd.name)
				System.log("datastore.name = " + datastore.name)
				if (pd.name == datastore.name) {
					System.log(datastore.name + " belongs to " + pg.name);
					abrProtectionGroups[countAbrPGs] = pg;
					countAbrPGs++;
					break;
				}
			}
		} catch (e) {
			System.log(e);
		}
	}
}

if (abrProtectionGroups && abrProtectionGroups.length > 0) {
	System.log("Number of protection groups found: " + abrProtectionGroups.length);
	for(var k=0; k < abrProtectionGroups.length; k++) {
		var currentPG = abrProtectionGroups[k];
		System.log("Protection group matching datastore: " + datastore.name + " is: " + currentPG.name);
	}
} else {
	System.log("No matching protection group found");
}