/**
 * set result
 *
 * @param {Array/CompositeType(path:string,type:string,size:number):VcGuestFileInfoType} result
 * @param {string} path
 * @return {boolean} exists
 */
exists = false;
for (var i in result) {
	var f = result[i];
	System.log(">" + f.path + "<");
	System.log(">" + path + "<");
	System.log(f.path + " : " + f.type + " p:" + (f.path == path) + " f:" + (f.type == "file"));
	if (f.path == path && f.type == "file") {
		exists = true;
		break;
	}
}