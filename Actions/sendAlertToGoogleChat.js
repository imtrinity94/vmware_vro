/**
 * @description Sends a text notification message to a Google Chat webhook using the Node.js
 *              HTTPS module. Intended for use as a vRO ABX action handler.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {Any} context - The ABX execution context.
 * @param {Any} inputs - The action inputs.
 * @param {string} inputs.message - The text message to send to the Google Chat space.
 * @param {string} inputs.webhookPath - The Google Chat webhook path (e.g. /v1/spaces/.../messages).
 * @param {Function} callback - The ABX callback function to signal completion.
 * @returns {void}
 */

exports.handler = (executionScope, actionInputs, resultCallback) => {
    const nodeHttps = require('https');
    
    const notificationPayload = JSON.stringify({
        'text': actionInputs.message
    });
    
    const requestOptions = {
        hostname: 'chat.googleapis.com',
        port: 443,
        path: actionInputs.webhookPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': Buffer.byteLength(notificationPayload)
        }
    };
    
    console.log(`Dispatching notification to Google Chat: ${requestOptions.hostname}${requestOptions.path}`);
    
    const httpRequest = nodeHttps.request(requestOptions, (httpResponse) => {
        console.log(`Response Status: ${httpResponse.statusCode}`);

        httpResponse.on('data', (chunk) => {
            console.log(`DEBUG Payload: ${chunk}`);
        });
        
        httpResponse.on('end', () => {
            console.log('HTTP request transition to END state.');
        });
    });
    
    httpRequest.on('error', (reqError) => {
        console.error(`Webhook execution failed: ${reqError.message}`);
    });

    httpRequest.write(notificationPayload);
    httpRequest.end();

    // Signal completion to Aria Automation ABX runtime
    resultCallback(undefined, {
        status: "SUCCESS",
        timestamp: new Date().toISOString()
    });
};
