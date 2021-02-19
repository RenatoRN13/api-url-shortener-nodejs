import knex from 'knex';

const connection = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'root',
      database : 'challenge_wiser'
    }
  });

export default connection;