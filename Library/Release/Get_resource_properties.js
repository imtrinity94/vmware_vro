/**
 * Get resource properties
 *
 * @param {string} attrNsxEdgeTypeName - [object Object]
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @param {string} networkProfileType
 * @return {string} attrResourceId
 * @return {boolean} attrNsxEdgeRelease - [object Object]
 */
attrResourceId = ResourceNew.Id;
System.log(networkProfileType)
attrNsxEdgeRelease = (networkProfileType == attrNsxEdgeTypeName)?true:false;