/**
 * getTransformation
 *
 * @param {Any} relocateSpec
 * @param {string} transform
 * @return {Any} relocateSpec
 */
if (transform != null) {
	if (transform == "Sparse (Thin)") {
		var transformJsType = VcVirtualMachineRelocateTransformation.fromString("sparse");
		relocateSpec.transform = transformJsType;
	}
	else if (transform == "Flat (Thick)") {
		var transformJsType = VcVirtualMachineRelocateTransformation.fromString("flat");
		relocateSpec.transform = transformJsType;
	}
}
