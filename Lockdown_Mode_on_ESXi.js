//If you wanted to enable Normal lockdown mode on all ESXi hosts you would use the following code:

 

//Get all hosts
hosts = System.getModule(“com.vmware.library.vc.host”).getAllHostSystems();

for each (host in hosts)
{

// Compare lockdown modes
if (host.config.lockdownMode.value === “lockdownDisabled”)
{
host.enterLockdownMode();
System.log(host.name + ” is being locked down”);
}
else if (host.config.lockdownMode.value === “lockdownNormal”)
{
System.log(host.name + ” is already locked down”);
}

}

//Now if you wanted to disable lockdown you would just run the following code:

//Get all hosts
hosts = System.getModule("com.vmware.library.vc.host").getAllHostSystems();

for each (host in hosts)
{

   // Compare lockdown modes
   if (host.config.lockdownMode.value === "lockdownDisabled")
   {
   System.log(host.name + " is already not in lock down mode");
    }
else if (host.config.lockdownMode.value === "lockdownNormal")
    {

    host.exitLockdownMode();
    System.log(host.name + " is now not in lock down mode.");
    }

}
