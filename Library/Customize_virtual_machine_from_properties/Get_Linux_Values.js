/**
 * Get Linux Values
 *
 * @param {Properties} props
 * @return {string} linClientName
 * @return {boolean} linDoSysprep
 */
if (props.get("linDoSysprep") == null)
	linDoSysprep = true;
else 
	linDoSysprep = props.get("linDoSysprep");
System.debug("Doing Sysprep: " + linDoSysprep);
	
linClientName = props.get("linClientName");