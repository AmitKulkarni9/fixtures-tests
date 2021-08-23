const path = require('path');
const {Client} = require('pg');
const config = require('./config.json');

// Getting connection parameters from config.json
const host = config.host;
const user = config.user;
const pw = config.pw;
const db = config.db;
const port = config.port;
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`;


class RemoveData {
    async Remove (table) {
        try {
            const client = new Client({connectionString: conString,});
            client.connect();  // gets connection
            client.query(`DELETE FROM ${table} WHERE id IN ($1,$2,$3) RETURNING *`, [1,2,3], (err, result) => {
                if(err) {
                    console.log(err);
                    client.end();
                    return;
                } else {
                    console.log(`Deleted data from ${table}`);
                    //let results= result.rows;
                    //console.log(results);
                    client.end();
                    return;
                }
            });
        } catch (e) {
            console.error(e);
            client.end();
            return;
        }
    }
}
module.exports = RemoveData;