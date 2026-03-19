/**
 * Scriptable task
 *
 * @param {string} name
 * @return {string} greeting
 */
var service = new NetappONTAPGreetingService();

greeting = service.greet(name);