var people = <people>
                 <person id="1">
                     <name>Moe</name>
                 </person>
                 <person id="2">
                     <name>Larry</name>
                 </person>
             </people>;

System.log("'people' = " + people);

// built-in XML type
System.log("'people' is of type : " + typeof(people)); 

// list-like interface System.log("which contains a list of " +
people.person.length() + " persons"); 
System.log("whose first element is : " + people.person[0]);

// attribute 'id' is mapped to field '@id'
people.person[0].@id='47'; 
// change Moe's id to 47 
// also supports search by constraints
System.log("Moe's id is now : " + people.person.(name=='Moe').@id);

// suppress Moe from the list
delete people.person[0];
System.log("Moe is now removed.");

// new (sub-)document can be built from a string 
people.person[1] = new XML("<person id=\"3\"><name>James</name></person>");
System.log("Added James to the list, which is now :");
for each(var person in people..person)

for each(var person in people..person){
	System.log("- " + person.name + " (id=" + person.@id + ")"); 
}
