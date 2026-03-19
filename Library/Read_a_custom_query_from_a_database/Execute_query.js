/**
 * Execute query
 *
 * @param {SQL:Database} database
 * @param {string} query
 * @return {Array/SQL:ActiveRecord} resultRecords
 */
System.log("Executing query " + query + " on database " + database.name );
resultRecords = database.readCustomQuery(query);

