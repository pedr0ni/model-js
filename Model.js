module.exports  = class Model {

    /**
     * Receive table name with class children class name toLowerCase plus 's'
     * @param {Connection} connection 
     */
    constructor(connection) {
        this.table = this.constructor.name.toLowerCase() + "s";
        this.connection = connection;
    }

    /**
     * List a data with id as integer. (one value is returned)
     * @param {int} id
     * @returns {Mysql-Promise} 
     */
    find(id) {
        return this.connection.query("SELECT * FROM " + this.table + " WHERE id = '"+id+"' LIMIT 1;");
    }

    /**
     * Select rows with WHERE conditions
     * @param {Array} conditions
     */
    where(conditions) {
        let queryBuilder = "SELECT * FROM " + this.table + " WHERE (";
        conditions.forEach(entry => {
            queryBuilder += entry[0].key + " = '" + entry[0].value + "' AND ";
        });
        queryBuilder += ")";
        queryBuilder = queryBuilder.substring(0, queryBuilder.lastIndexOf('AND')) + "" + queryBuilder.substring(queryBuilder.lastIndexOf('AND') + 3);
        return this.connection.query(queryBuilder);
    }

    /**
     * Insert data with values
     * @param {JSON} map 
     */
    create(map) {
        let queryBuilder = "INSERT INTO " + this.table + " ("
        for (var x in map) {
            queryBuilder += x + ",";
        }
        queryBuilder += ")";
        queryBuilder = this.replaceIndex(queryBuilder, ",", "");
        queryBuilder += " VALUES (";
        for (var x in map) {
            queryBuilder += "'" + map[x] + "',";
        }
        queryBuilder += ");";
        queryBuilder = this.replaceIndex(queryBuilder, ",", "");
        return this.connection.query(queryBuilder);
    }

    replaceIndex(str, from, replace) {
        return str.substring(0, str.lastIndexOf(from)) + replace + str.substring(str.lastIndexOf(from) + from.length);
    }

}