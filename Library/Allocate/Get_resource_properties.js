/**
 * Get resource properties
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantId:string,TenantName:string,Properties:Properties):Resource} Resource
 * @param {string} attrNsxEdgeTypeName - [object Object]
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @return {string} attrTenantId
 * @return {string} attrTenantName
 * @return {string} attrResourceId
 * @return {string} attrResourceName
 * @return {boolean} attrNsxEdgeAllocation - [object Object]
 */
attrTenantId = ResourceNew.TenantId;
attrTenantName = ResourceNew.TenantName;
attrResourceId = ResourceNew.Id;
attrResourceName = ResourceNew.Name;
attrNsxEdgeAllocation = (ResourceNew.Type == attrNsxEdgeTypeName)?true:false;