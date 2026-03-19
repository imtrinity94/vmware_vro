/**
 * createObject
 *
 * @param {string} controller
 * @param {Any} createdObj
 * @param {string} hmData
 * @param {string} poolData
 * @param {string} virtualServiceData
 * @param {boolean} vsVIP - [object Object]
 * @param {string} vsVipData
 * @return {Avi:VirtualService} virtualServiceObject
 */
//controllerIP = aviVroClient.getCred();
virtualServiceObject = new AviVirtualService() ;
virtualServiceObject=createdObj[createdObj.length-1];	
System.log("Object Created:-> "+virtualServiceObject.getName());
