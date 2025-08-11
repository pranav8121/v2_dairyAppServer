const config = {
    "app_env": process.env.app_env,

    "db_host": process.env.db_host,
    "db_username": process.env.db_username,
    "db_password": process.env.db_password,
    "db_name": process.env.db_name,
    "db_port": parseInt(process.env.db_port),

    "sql_encKey": process.env.SQL_KEY,

    "corsOptions": process.env.corsOptions,

    "jwt_key": process.env.JWT_SECRET,
    "jwt_expires_in": process.env.JWT_EXPIRES_IN,

    "redis_host": process.env.REDIS_HOST || 'localhost',
    "redis_port": process.env.REDIS_PORT || 6379
};

module.exports = config;