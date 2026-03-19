/**
 * convertTimeToHoursAndValidate
 *
 * @param {number} expirationTime
 * @param {number} retentionTime
 * @param {string} expirationTimeUnit
 * @param {string} retentionTimeUnit
 * @return {number} retentionHours
 * @return {number} expirationHours
 */
expirationHours = 0;
retentionHours = 0;

if(expirationTime > 0)
{
	if (expirationTimeUnit == "days") {
		if (expirationTime > 1825)
		{
			var expTimeError = ("Expiration time is a positive integer and should be in the range of of 1–1825 days."); 
			System.error(expTimeError);
			throw (expTimeError);
		}
		expirationHours = (expirationTime * 24);
		System.debug("Expiration hours " + expirationHours);
	}else {		
		expirationHours = expirationTime ;
	}
}

if(retentionTime > 0)
{
	if (retentionTimeUnit == "days") {
		if (retentionTime > 1825)
		{
			var expTimeError = ("Retention time is a positive integer and should be in the range of of 1–1825 days."); 
			System.error(expTimeError);
			throw (expTimeError);
		}
		retentionHours = (retentionTime * 24);
		System.debug("Expiration hours " + retentionHours);
	}else {
		retentionHours = retentionTime ;
	}
}