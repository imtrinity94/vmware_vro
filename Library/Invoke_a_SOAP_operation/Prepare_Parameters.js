/**
 * Prepare Parameters
 *
 * @param {SOAP:Operation} operation
 * @param {string} parameter1
 * @param {string} parameter2
 * @param {string} parameter3
 * @param {string} parameter4
 * @param {string} parameter5
 * @param {string} parameter6
 * @param {string} parameter7
 * @param {string} parameter8
 * @param {string} parameter9
 * @param {string} parameter10
 * @param {string} parameter11
 * @param {string} parameter12
 * @param {string} parameter13
 * @param {string} parameter14
 * @param {string} parameter15
 * @param {string} header1
 * @param {string} header2
 * @param {string} header3
 * @param {string} header4
 * @param {string} header5
 * @return {Properties} header
 * @return {Properties} parameter
 * @return {Properties} attribute
 */
header = new Properties();
parameter = new Properties();
attribute = new Properties();

var inHeaders = operation.getInHeaders();
var headerSize = inHeaders.length;

var inParameters = operation.getInParameters();
var size = inParameters.length;

// processing headers
setHeader(1, header1);
setHeader(2, header2);
setHeader(3, header3);
setHeader(4, header4);
setHeader(5, header5);

// processing parameters
setParameter(1, parameter1);
setParameter(2, parameter2);
setParameter(3, parameter3);
setParameter(4, parameter4);
setParameter(5, parameter5);
setParameter(6, parameter6);
setParameter(7, parameter7);
setParameter(8, parameter8);
setParameter(9, parameter9);
setParameter(10, parameter10);
setParameter(11, parameter11);
setParameter(12, parameter12);
setParameter(13, parameter13);
setParameter(14, parameter14);
setParameter(15, parameter15);

// helper functions
function setParameter(paramPosition, paramValue) {
	if (size >= paramPosition) {
		var rawName = inParameters[paramPosition - 1];
		var trimmedInParam = rawName.replace("[]", "[0]");
		if(isAttribute(rawName)) {
			attribute.put(trimmedInParam, paramValue);
		} else { //it's a parameter
			parameter.put(trimmedInParam, paramValue);
		}
	}
}

function setHeader(headerPosition, headerValue) {
	if (headerSize >= headerPosition) {
		header.put(inHeaders[headerPosition - 1].replace("[]", "[0]"), headerValue);
	}
}

function isAttribute(name){
	return name.indexOf('(') != -1;
}
