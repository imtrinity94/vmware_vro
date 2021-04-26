///INPUT
//pvdc of type vCloud:ProviderVdc
var adminVdcs = pvdc.getAdminVdcs();
var ovdcArray = [];
for (var index = 0; index < adminVdcs.length; index++)
    ovdcArray.push(adminVdcs[index].parent);
ovdcArray = removeDuplicates(ovdcArray);
if (ovdcArray == []) System.error("No oVdc found inside " + pvdc.name + " pVdc");
else {
    for (var i = 0; i < ovdcArray.length; i++)
        System.log(ovdcArray[i].name);
}
function removeDuplicates(array) {
    var seen = {};
    return array.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

return ovdcArray; //OUTPUT array of vCloud:Organization
