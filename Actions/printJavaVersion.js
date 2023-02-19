//Set System properties
//com.vmware.js.allow-local-process to true
//Run this code in action
var com = new Command("jdk/bin/java --version");
com.execute(true);
System.log(com.output);

