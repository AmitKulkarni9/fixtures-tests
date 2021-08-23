const fs = require('fs');
const path = require('path');
const {Client} = require('pg');
const copyFrom = require('pg-copy-streams').from;
const config = require('./config.json');

// Getting connection parameters from config.json
const host = config.host;
const user = config.user;
const pw = config.pw;
const db = config.db;
const port = config.port;
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`;

        
class LoadData {
    async Load (targetTable) {
        try {
            const inputFile = path.join(__dirname, `/data/${targetTable}.csv`);
            const client = new Client({connectionString: conString,});
            client.connect();  // gets connection
            const stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN WITH CSV HEADER`));
            const fileStream = fs.createReadStream(inputFile);
            fileStream.on('error', (error) =>{
                console.log(`Error in creating read stream ${error}`);
                client.end();
                return;
            })
            stream.on('error', (error) => {
                console.log(`Error in creating stream ${error}`);
                client.end();
                return;
            })
            stream.on('finish', () => {
                console.log(`Completed loading data into ${targetTable}`);
                client.end();
            })
            fileStream.pipe(stream);
            return;
        } catch (e) {
            console.error(e);
            client.end();
            return;
        }
    }
}
module.exports = LoadData;
