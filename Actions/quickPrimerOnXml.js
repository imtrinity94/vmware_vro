/**
 * @description A quick primer demonstrating the vRO built-in XML (E4X) type. Shows how to
 *              create inline XML literals, access elements and attributes, modify values,
 *              delete nodes, and iterate over elements.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var peopleXml = <people>
                    <person id="1">
                        <name>Moe</name>
                    </person>
                    <person id="2">
                        <name>Larry</name>
                    </person>
                </people>;

System.log("Initial XML structure: " + peopleXml);

// Demonstrating built-in E4X type
System.log("Type check for 'peopleXml': " + typeof(peopleXml));

// List-like interface access
var personNodesCount = peopleXml.person.length();
System.log("Total persons discovered: " + personNodesCount);
System.log("Exposing first person node: " + peopleXml.person[0]);

// Modification: Changing attribute 'id' via '@' selector
peopleXml.person[0].@id = '47';
System.log("Updated identity for 'Moe' to ID 47.");

// Search/Selection by constraint (ECMAScript for XML feature)
var moeNode = peopleXml.person.(name == 'Moe');
System.log("Constraint search -> Moe's resolved ID: " + moeNode.@id);

// Deletion of node
delete peopleXml.person[0];
System.log("Node deletion complete. Moe has been removed.");

// Construction from string
var jamesXmlNode = new XML("<person id=\"3\"><name>James</name></person>");
peopleXml.person[1] = jamesXmlNode;
System.log("Added 'James' node to the collection.");

// Iteration over specific descendants using '..' (descendant accessor)
var finalPersonsList = peopleXml..person;
System.log("Iterating through final XML person list:");

var i;
for (i = 0; i < finalPersonsList.length(); i++) {
    var personObj = finalPersonsList[i];
    System.log("Person Found: " + personObj.name + " [ID: " + personObj.@id + "]");
}

return null;
