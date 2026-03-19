/**
 * Validate & Convert Size
 *
 * @param {number} growthIncrement
 * @param {number} growthLimit
 * @param {number} growthWarning
 * @param {string} growthIncrementUnit
 * @param {string} growthLimitUnit
 * @param {string} growthWarningUnit
 * @param {number} growthLimitMiB
 * @param {number} growthIncrementMiB
 * @param {number} growthWarningMiB
 * @return {number} growthLimitMiB
 * @return {number} growthIncrementMiB
 * @return {number} growthWarningMiB
 */
if(growthIncrementUnit === "GiB") {
	growthIncrementMiB = 1024 * growthIncrement;
}
else
if(growthIncrementUnit === "TiB") {
	growthIncrementMiB = 1048576 * growthIncrement;
}
else 
if(growthIncrementUnit === "MiB") {
	growthIncrementMiB = growthIncrement;
}

if(growthWarningUnit === "GiB") {
	growthWarningMiB = 1024 * growthWarning;
}
else
if(growthWarningUnit === "TiB") {
	growthWarningMiB = 1048576 * growthWarning;
}
else 
if(growthWarningUnit === "MiB") {
	growthWarningMiB = growthWarning;
}


if(growthLimitUnit === "GiB") {
	growthLimitMiB = 1024 * growthLimit;
}
else
if(growthLimitUnit === "TiB") {
	growthLimitMiB = 1048576 * growthLimit;
}
else 
if(growthLimitUnit === "MiB") {
	growthLimitMiB = growthLimit;
}
