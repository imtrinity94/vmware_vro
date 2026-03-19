/**
 * FInd Recovery Plan
 *
 * @param {SRM:Site} site
 * @param {SRM:ProtectionGroup} protectionGroup
 * @return {SRM:RecoveryPlan} recoveryPlan
 */
/* Copyright (c) 2014-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */

var plans = site.getRecoveryPlans();
System.debug("Recovery plan count = " + plans.length);
for (var i=0; i < plans.length; i++) {
	var plan = plans[i];
	var groups = plan.getProtectionGroup();
	System.debug("Recovery plan '" + plan.name +"' has " + groups.length + " protection group(s)");
	for (var j=0; j < groups.length; j++) {
		var group = groups[j];
		System.debug("Does '" + protectionGroup.name + "' = '" + group.name + "'");
		if (protectionGroup.name == group.name) {
			recoveryPlan = plan;
			System.log("Selecting " + recoveryPlan.name);
		}
	}
}

