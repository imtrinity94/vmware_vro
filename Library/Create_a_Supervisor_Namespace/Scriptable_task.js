/**
 * Simple task with custom script capability.
 *
 * @param {VCFA:Project} project
 * @param {string} namespaceSpec
 * @return {VCFA:SupervisorNamespace} namespace
 */
var host = project.host;

var cciService = host.cciService;

namespace = cciService.createSupervisorNamespace(project.name, namespaceSpec)
