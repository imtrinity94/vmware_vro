/**
 * createObject
 *
 * @param {string} controller
 * @param {string} hmData
 * @param {string} poolData
 * @param {string} virtualServiceData
 * @param {string} vsVipData
 * @param {Avi:AviVroClient} aviVroClient
 * @param {boolean} vsVIP - [object Object]
 * @param {Any} createdObj
 * @return {Avi:VirtualService} virtualServiceObject
 */
virtualServiceObject = Server.findForType('Avi:VirtualService', System.getObjectId(virtualServiceObject));
virtualServiceObject=createdObj[createdObj.length-1];	
System.log("Object Created:-> "+virtualServiceObject.getName());
