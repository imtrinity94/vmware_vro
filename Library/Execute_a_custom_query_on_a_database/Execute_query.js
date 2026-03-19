/**
 * Execute query
 *
 * @param {SQL:Database} database
 * @param {string} query
 * @return {string} errorCode
 * @return {number} rowsAffected
 */
System.log("Executing query " + query + " on database " + database.name );
rowsAffected = database.executeCustomQuery(query);
System.log("Rows affected: "+ rowsAffected);