/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} avivroClient
 * @param {string} nsxtCloud
 * @param {string} segment
 * @param {Array/string} Segment_Pool
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").CreateSegmentPool(avivroClient,nsxtCloud,segment,Segment_Pool);
