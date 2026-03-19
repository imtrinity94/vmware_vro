/**
 * Remove Empty Array Elements
 *
 * @param {Array/SRM:UnassignedReplicatedVm} ConvertedVMs
 * @return {Array/SRM:UnassignedReplicatedVm} UnassignedReplicatedVM
 */
/* Copyright (c) 2015-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */
var resultLength = ConvertedVMs.length;
UnassignedReplicatedVM = new Array();
for (var i = 0; i < resultLength; i++) {
	var result = ConvertedVMs[i];
	if (result) {
		UnassignedReplicatedVM.push(result);
	}
}