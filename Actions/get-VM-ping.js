// VMware vRealize Orchestrator action sample
//
// Get VM Ping Status.
// 
// For vRO/VRA 6.x/7.x
//
// Action Inputs:
// vmName - string - VM Name
// domainName - string - {vmName}.{domainName} -> FQDN
// Return type: string - Ping Status



vmName = vmName + "." + domainName;
cmd = "ping -q -c 1 " + vmName;
pingCommand = new Command(cmd);
pingCommand.execute(true);
System.log("Ping result: " + pingCommand.output + " " + pingCommand.result);
if (pingCommand.result == 0){{
		return "Ping response is Ok";
	}
	 return "Ping response was null";
}
