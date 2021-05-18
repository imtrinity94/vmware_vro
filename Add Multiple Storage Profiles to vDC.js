//Input pvDC oftype(vCloud:ProviderVdc) and vDC oftype(vCloud:Vdc)
System.log("Starting \"Prepare Inputs for Storage Profiles\" script");
SP_Array = pvdc.getProviderStorageProfiles();

var vdcStorageProfile = vDC.vdcStorageProfiles.vdcStorageProfile;
var arr = vdcStorageProfile.enumerate();
for (var i = 0; i< arr.length; i++){
    var vdcStorageProfile = System.getModule("org.telus.vCloud").getvCloudHost().getEntityByReference(VclFinderType.VDC_STORAGE_PROFILE, arr[i]);
    for (var j =0; j < SP_Array.length; j++){
        if(vdcStorageProfile.name == SP_Array[j].name){
            SP_Array.splice(j,1);
        }
    }
}
SP_Array = condenseSparseArray(SP_Array);


function condenseSparseArray(a) { 
 var b = []; 
 for(var ind = 0;ind < a.length;ind++) { 
  if (a[ind] !== undefined && a[ind] !== null) { 
   b.push(a[ind]); 
  }
 } 
 return b; 
}

System.log("Starting \"Prepare Inputs for Storage Profiles\" script");
