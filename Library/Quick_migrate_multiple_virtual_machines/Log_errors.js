/**
 * Log errors
 *
 * @param {Array/WorkflowToken} worfklowTokens
 */
for each (var token in worfklowTokens) {
	if (token.state == "failed") {
		try {
			var vm = token.getInputParameters().get("vm")
			System.warn("Quick migration failed for vm '" + vm.name + "' (" + vm.sdkId + "). Reason: " + token.exception);
		}
		catch (ex) {
			System.warn("Quick migration failed for unknown vm");
		}
	}
}