/**
 * @name sendNotificationsToGoogleChat
 * @author Mayank Goyal <mayankgoyalmax@gmail.com>
 * @version 1.0.0
 * @description Send a notification to Google Chatbot
 * @param {string} message 
 * @param {string} webhookPath
 * @returns null
 */
exports.handler = (context, inputs, callback) => {
    const https = require('https') //standard library
    const data = JSON.stringify({
        'text': inputs.message
    })
    const options = {
        hostname: 'chat.googleapis.com',
        port: 443,
        path: inputs.webhookPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': data.length
        }
    }
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            console.log(d)
        })
    })
    req.on('error', error => {
        console.log(error)
    })

    req.write(data)
    req.end()

    callback(undefined, {
        status: "done"
    });
}
