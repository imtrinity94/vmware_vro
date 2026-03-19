/**
 * Scriptable task
 *
 * @param {SQL:Table} table
 * @return {SQL:Table} result
 */
result = SQLDatabaseManager.removeTableFromDatabase(table);
System.log("Removed table " + result.name + " from database " + result.database.name);

