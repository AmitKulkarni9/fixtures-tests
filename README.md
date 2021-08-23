# fixtures-tests

  Contains nodejs script to load and remove data from postgres database as a function which can be used in a test to load data and then start test, once the test finishes remove the data.
  LoadData.js to load data into postgres database.
  RemoveData.js to remove data from postgres database.
  config.json to configure the postgres database parameters.

  LoadData.js uses the pg-copy-streams package (https://github.com/brianc/node-pg-copy-streams) to load data from a csv file.
  RemoveData.js uses pg package (https://github.com/brianc/node-postgres) to remove/delete data from the database.
