/**
 * Prepare Parameters
 *
 * @param {SOAP:Operation} operation
 * @param {string} dateFormat
 * @return {string} operationName
 * @return {SOAP:Host} host
 * @return {Properties} options
 */
operationName = operation.name;

host = Server.findForType("SOAP:Host", operation.getHost().id);

options = new Properties();
options.put("datetime.format", dateFormat);
