/**
 * Get current Nic Type
 *
 * @param {string} nic4Type
 * @param {string} nic3Type
 * @param {string} nic2Type
 * @param {string} nic1Type
 * @param {number} currentId
 * @return {string} currentNicType
 */
switch (currentId) {
	case 0: 
		currentNicType = nic1Type;
		break;
	case 1:
		currentNicType = nic2Type;
		break;
	case 2:
		currentNicType = nic3Type;
		break;
	case 3:
		currentNicType = nic4Type;
		break;
	default :
		throw "Invalid Current Index";
}