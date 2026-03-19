/**
 * Sort by priority
 *
 * @param {Array/CompositeType(id:string,index:number,url:string,username:string,password:SecureString,priority:number):ConnectionInfo} attrFailoverEndpoints
 * @return {Array/CompositeType(id:string,index:number,url:string,username:string,password:SecureString,priority:number):ConnectionInfo} attrFailoverEndpoints
 */
attrFailoverEndpoints = attrFailoverEndpoints.sort(compareByPriority);

function compareByPriority(a, b) {
  return a.priority - b.priority;
}
