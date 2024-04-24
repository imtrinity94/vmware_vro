var urlObject = new URL(url);

var csvFile = urlObject.getContent();

System.log(csvFile);

var lines = csvFile.replace("\r","").split("\n") //strip out carriage returns in case this is Windows

var headerLine = lines[0];

var headerFields = headerLine.split(",");

var objects = new Array();

for(var l in lines)

{

    if(l > 0)

    {

        var line = lines[l];

        var columns = line.split(",");

       

        objects[l - 1] = {};

       

        for(var h in headerFields)

        {

            var curHeader = headerFields[h];

            objects[l - 1][curHeader] = columns[h];

        }

    }

}

System.log(JSON.stringify(objects));

//Sample output from a GET to http://[webserver]/csvfile.csv:

//[2017-11-15 17:55:04.523] [I] firstname,lastname,middleinitial,age

//John,Doe,B,30

//Jane,Doe,H,32

//Jimmy,Dean,L,29

//[2017-11-15 17:55:04.530] [I] [{"firstname":"John","lastname":"Doe","middleinitial":"B","age":"30"},{"firstname":"Jane","lastname":"Doe","middleinitial":"H","age":"32"},{"firstname":"Jimmy","lastname":"Dean","middleinitial":"L","age":"29"}]
