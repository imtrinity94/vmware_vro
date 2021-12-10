This example shows the use of JavaScript with the vSphere Automation SDK for REST to apply a SAML token to the vSphere Automation API Endpoint and exchange it for a vSphere Automation API session ID.

The example assumes that you have previously saved certain connection information in global variables. The JavaScript depends on the Node.js package, which allows it to run standalone.

This example depends on the following global variables.

■
my_vapi_host

■
my_vapi_port

■
my_saml_token

■
my_http_options

// Import required libraries.
var sso = require('./sso');
var https = require('https');
var gzip = require('gzip-js');

// Configure HTTP request.
var sessionPath = '/rest/com/vmware/cis/session';
var httpMethod = 'POST';

// Base64 encode the token value for the security context.
var b64Token = new Buffer(gzip.zip(my_saml_token)).toString('base64');

// Build the Authorization header value.
var start = 0;
var bufSize = 3 * 1024;
var prefix = 'SIGN ';
var authArray = [];
while (start < b64Token.length) {
  var end = start + bufSize;
  authArray.push(prefix + 'token="' + b64Token.slice(start, end) + '"');
  start = end;
  prefix = '';
}

// Prepare the HTTP request.
my_http_options = {
  host: my_vapi_host,
  port: my_vapi_port,
  path: sessionPath,
  method: httpMethod,
  rejectUnauthorized: false,
  requestCert: true,
  agent: false,
  headers: {
    'Authorization': authArray
  }
};

// Define the callbacks.
function callback(res) {
  res.on('error', function(err) { console.log('Login error: ', err) });
  res.on('data', function(chunk) {});
  res.on('end', function() {
    var cookieValue = res.headers['set-cookie'];
    my_http_options[headers] = {'Cookie': cookieValue,
                                'Content-Type': 'application/json'}  // Save the session ID.
  }
}

// Issue the login request.
https.request(my_http_options, callback).end();
