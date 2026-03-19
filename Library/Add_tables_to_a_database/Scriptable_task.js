/**
 * Scriptable task
 *
 * @param {SQL:Database} database
 * @param {Array/string} tableNames
 * @return {Array/SQL:Table} result
 */
result = SQLDatabaseManager.addTablesToDatabase(database, tableNames);
for(var i = 0; i < tableNames.length; ++i) {
	System.log("Added table " + tableNames[i] + " to database " + database.name);
}