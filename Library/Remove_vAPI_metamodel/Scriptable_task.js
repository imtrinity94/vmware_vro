/**
 * Scriptable task
 *
 * @param {VAPI:VAPIMetamodel} metamodel
 */
if (metamodel == null) {
  throw "'metamodel' parameter should not be null";
}

VAPIManager.removeMetamodel(metamodel.endpointUrl);

