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

}