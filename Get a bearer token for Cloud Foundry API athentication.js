// Get Token
var username = "apiServiceUser";
var password = "secretPassword";
var loginApi = System.getModule("com.vmware.pso.util").getConfigElementAttributeValue("PSO/PaaS", "REST", "loginApi");
var requestType = "GET";
var operationUrl = "/oauth/token?grant_type=password&username="+ username + "&password=" + password;
var request = loginApi.createRequest(requestType, operationUrl);
request.contentType = "application\/x-www-form-urlencoded;charset=utf-8";
request.setHeader("Accept","application/json;charset=utf-8");
var response = request.execute();
if(response.statusCode != 200) throw "REST request failed with staus code "+response.statusCode+"\r\nResponse is: "+response.contentAsString;
var json = JSON.parse(response.contentAsString);
var token = json.access_token;
