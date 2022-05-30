You can use objects from the API of the PowerShell plug-in to work with results that Windows PowerShell returns.

You can use the methods from the PowerShellInvocationResult class to get information about a script that you run.
Method	Description
getErrors()	Returns a list of errors reported by the PowerShell engine during script invocation.
getInvocationState()	Status of the script. The possible values are Completed or Failed.
getHostOutput()	Output of the script as it appears on the PowerShell console.
getResults()	Objects returned by the PowerShell engine. The returned object is of type PowershellRemotePSObject.
PowershellRemotePSObject is a remote representation of objects returned by the PowerShell engine. PowershellRemotePSObject contains XML serialization of the result that can be accessed by calling the getXml() method.

The PowerShell plug-in also provides an object model that wraps the XML result and provides easier access to particular object properties. The getRootObject() method provides access to the object model. In general, the getRootObject() method maps the PowerShell types to types available in Orchestrator, by using the following rules.
If the returned object is of a primitive PowerShell type, the object is mapped to the corresponding Orchestrator primitive type.
If the returned object is of type collection, the object is represented as ArrayList.
If the returned object is of type dictionary, the object is represented as Hashtable.
If the returned object is of type complex, the object is represented as PSObject.
