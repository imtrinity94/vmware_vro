/**
 * @description Sends a text notification message to a Google Chat webhook using the Node.js
 *              HTTPS module. Intended for use as a vRO ABX action handler.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {*} context - The ABX execution context.
 * @param {Object} inputs - The action inputs.
 * @param {string} inputs.message - The text message to send to the Google Chat space.
 * @param {string} inputs.webhookPath - The Google Chat webhook path (e.g. /v1/spaces/.../messages).
 * @param {Function} callback - The ABX callback function to signal completion.
 * @returns {void}
 */

exports.handler = (context, inputs, callback) => {
    const https = require('https'); // standard library
    const data = JSON.stringify({
        'text': inputs.message
    });
    const options = {
        hostname: 'chat.googleapis.com',
        port: 443,
        path: inputs.webhookPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': data.length
        }
    };
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            console.log(d);
        });
    });
    req.on('error', error => {
        console.log(error);
    });

    req.write(data);
    req.end();

    callback(undefined, {
        status: "done"
    });
};
