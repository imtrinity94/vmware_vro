/**
 * Unpresent Volume
 *
 * @param {StoreServ:Volume} volume
 * @param {boolean} isVolumePresented
 * @param {StoreServ:HostSet} hostGroupObj
 * @param {StoreServ:Connection} connection
 * @param {number} lunid
 */
if (isVolumePresented)
{
	var unpresent = System.getModule("com.hpe.storeserv.export").unexportVirtualVolumeFromHostSet(connection,volume,lunid,hostGroupObj)
}