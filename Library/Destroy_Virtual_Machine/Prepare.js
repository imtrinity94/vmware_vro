/**
 * Prepare
 *
 * @param {vCACCAFE:CatalogResource} vraVM
 * @return {vCACCAFE:CatalogResource} resource
 * @return {vCACCAFE:ConsumerResourceOperation} operation
 */
resource = vraVM;
if (resource == null) {
    throw "vRA vm is not set";
}

operation = null;
var operations = resource.getOperations();
for each (var o in operations) {
    if (o.bindingId == "Infrastructure.Virtual.Action.Destroy") {
        operation = o;
        break;
    }
}
if (operation == null) {
    throw "Can't find destroy vm operation";
}