/**
 * Unpresent Volume
 *
 * @param {StoreServ:Volume} volume
 * @param {number} lun
 * @param {boolean} isVolumePresented
 * @param {StoreServ:HostSet} hostGroupObj
 * @param {StoreServ:Connection} connection
 */
if (isVolumePresented)
{
	System.getModule("com.hpe.storeserv.export").unexportVirtualVolumeFromHostSet(connection,volume,lun,hostGroupObj)
}