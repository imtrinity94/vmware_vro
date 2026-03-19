/**
 * pc.retrievePropertiesEx
 *
 * @param {VC:SdkConnection} vc
 * @param {string} filter
 * @param {Array/string} targetTypes
 * @param {Array/string} properties
 * @param {Any} rootObject
 * @return {Array/string} foundObjects
 */
var containerRoot = null

if (typeof rootObject === 'undefined' || rootObject == null || rootObject == '<<null>>') {
    containerRoot = vc.rootFolder
} else {
    containerRoot = rootObject
}

var recursive = true

var containerView = vc.viewManager.createContainerView(containerRoot, targetTypes, recursive)

// create an object spec for the beginning of the traversal;
// container view is the root object for this traversal
var oSpec = new VcObjectSpec()
oSpec.obj = containerView.reference
oSpec.skip = true

// create a traversal spec to select all objects in the view
var tSpec = new VcTraversalSpec()
tSpec.name = 'traverseEntities'
tSpec.path = 'view'
tSpec.skip = false
tSpec.type = 'ContainerView'

// add it to the object spec
oSpec.selectSet = [tSpec]

var propertySpecs = new Array()
for (var t in targetTypes) {
    // specify the properties for retrieval
    var pSpec = new VcPropertySpec()
    pSpec.type = targetTypes[t]
    pSpec.pathSet = properties
    propertySpecs.push(pSpec)
}

var fs = new VcPropertyFilterSpec()
fs.objectSet = [ oSpec ]
fs.propSet = propertySpecs

var retrieveOptions = new VcRetrieveOptions()

var propertyCollector = vc.propertyCollector.createPropertyCollector()

try {
	retrieveResult = propertyCollector.retrievePropertiesEx([fs], retrieveOptions)

	do {
	    if (typeof retrieveResult !== 'undefined' && retrieveResult !== null) {
			processObjects(retrieveResult)
			if (retrieveResult.token !== 'undefined' && retrieveResult.token !== null) {
			    retrieveResult = propertyCollector.continueRetrievePropertiesEx(retrieveResult.token)
			} else {
			    break
			}	    
	    } else {
	      break;
	    }
	} while(true)
} finally {
    propertyCollector.destroyPropertyCollector()
    containerView.destroyView()
}

function processObjects(retrieveResult) {
    var resultObjects = retrieveResult.objects
    if (typeof foundObjects === 'undefined' || foundObjects === null) {
        foundObjects = new Array()
    }
    var pattern = new RegExp(filter)
    for (r in resultObjects) {
      var objContent = resultObjects[r]
      var id = objContent.obj.id
      var type = objContent.obj.type
      var props = objContent.propSet
      for (p in props) {
        if (pattern.test(props[p].val)) {
			var dunesId = "dunes://service.dunes.ch/CustomSDKObject?id='" 
                                      + vc.id + ",id:" + id +"'&dunesName='VC:" + type + "'"
            foundObjects.push(dunesId)
            break
        }
      }
    }
}