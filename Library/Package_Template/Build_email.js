/**
 * Build email
 *
 * @param {string} clMachineName
 * @return {string} content
 * @return {string} subject
 */
subject = "New Template uploaded to Content Library for evaluation:  " + clMachineName


	content = '<pre>New Temaplate has completed updates and is ready for testing ' +
				'<br/><br/>' +
				'Please login and run test procedures prior to connfigure image mappings for this new template.<br/>' +
				'<br/></pre>';
