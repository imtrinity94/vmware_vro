/**
 * set result
 *
 * @param {Array/CompositeType(path:string,type:string,size:number):VcGuestFileInfoType} result
 * @return {boolean} exists
 */
exists = false;
for (var i in result) {
	var f = result[i];
	if (f.path == "." && f.type == "directory") {
		exists = true;
		break;
	}
}