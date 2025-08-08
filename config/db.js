let config = require('./config');

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        port: config.db_port,
        host: config.db_host,
        user: config.db_username,
        password: config.db_password,
        database: config.db_name,
        timezone: '+05:30',
        decimalNumbers: true,
        dateStrings: true
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 300000,
    pool: { min: 2, max: 50 }
});

// Add connection event listeners
knex.client.pool.on('createSuccess', function (eventId, resource) {
    console.log(`🔗 ${config.db_name} Database connection established successfully`);
});

knex.client.pool.on('createFail', function (eventId, resource, error) {
    console.error('❌ Database connection failed:', error.message);
});

knex.client.pool.on('poolDestroySuccess', function (eventId, resource) {
    console.log('🔌 Database connection pool destroyed');
});

// Test the connection
knex.raw('SELECT 1+1 as result')
    .then(() => {
        console.log('✅ Database connection test successful');
    })
    .catch((error) => {
        console.error('❌ Database connection test failed:', error.message);
    });

module.exports = knex;
