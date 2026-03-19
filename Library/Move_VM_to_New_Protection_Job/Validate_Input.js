/**
 * Validate Input
 *
 * @param {CS:ProtectionJob} currentProtectionJob - [object Object]
 * @param {CS:ProtectionJob} newProtectionJob - [object Object]
 * @param {CS:VirtualMachine} vm - [object Object]
 */
if (!vm) {
	throw "[Invalid Input] Virtual Machine instance required.";
}

if(!currentProtectionJob)
{
	throw "[Invalid Input] The current protection job cannot be empty.";
}

if(newProtectionJob == "" || newProtectionJob == null)
{
	throw "[Invalid Input] The new protection job cannot be empty.";
}
