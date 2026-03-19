/**
 * Simple task with custom script capability.
 *
 * @param {string} vcenterUser
 * @param {SecureString} vcenterPassword
 * @param {string} vcenter
 * @param {string} datastore
 * @param {string} network
 * @param {string} folder
 * @param {string} Controller1_name
 * @param {string} datacenter
 * @param {string} Controller_IP_mask
 * @param {string} Controller_IP_GW
 * @param {string} controller1
 * @param {string} cluster
 * @param {string} ova_path
 * @param {string} resourcePool
 * @return {string} cmd1
 */

var encodePassword = encodeURIComponent(vcenterPassword);


if (resourcePool != "") {

    var ovfcommand;
    ovfcommand = "ovftool --datastore="+datastore+" --net:Management="+network+
             " --vmFolder='"+folder+"'  --name="+Controller1_name+
             " --prop:avi.mgmt-ip.CONTROLLER="+controller1+
             " --prop:avi.mgmt-mask.CONTROLLER="+Controller_IP_mask+
             " --prop:avi.default-gw.CONTROLLER="+Controller_IP_GW+
             " --powerOn"+
             " --noSSLVerify "+ova_path+
             " vi://"+vcenterUser+":'"+encodePassword+"'@"+vcenter+
             "/"+datacenter+"/host/"+cluster+"/Resources/"+resourcePool;
    //System.log(ovfcommand);  
    cmd1 = ovfcommand;

    
    
}else {
    ovfcommand = "ovftool --datastore="+datastore+" --net:Management="+network+
             " --vmFolder='"+folder+"' --name="+Controller1_name+
             " --prop:avi.mgmt-ip.CONTROLLER="+controller1+
             " --prop:avi.mgmt-mask.CONTROLLER="+Controller_IP_mask+
             " --prop:avi.default-gw.CONTROLLER="+Controller_IP_GW+
             " --powerOn"+
             " --noSSLVerify "+ova_path+
             " vi://"+vcenterUser+":'"+encodePassword+"'@"+vcenter+
             "/"+datacenter+"/host/"+cluster;
    //System.log(ovfcommand);  
    cmd1 = ovfcommand;

   

}






