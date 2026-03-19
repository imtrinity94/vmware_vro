/**
 * Get current Network
 *
 * @param {number} currentId
 * @param {Any} nic1Network
 * @param {Any} nic2Network
 * @param {Any} nic3Network
 * @param {Any} nic4Network
 * @return {Any} currentNetwork
 */
switch (currentId) {
	case 0: 
		currentNetwork = nic1Network;
		break;
	case 1:
		currentNetwork = nic2Network;
		break;
	case 2:
		currentNetwork = nic3Network;
		break;
	case 3:
		currentNetwork = nic4Network;
		break;
	default :
		throw "Invalid Current Index";
}