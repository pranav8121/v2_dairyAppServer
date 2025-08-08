const config = {
    "app_env": process.env.app_env,

    "db_host": process.env.db_host,
    "db_username": process.env.db_username,
    "db_password": process.env.db_password,
    "db_name": process.env.db_name,
    "db_port": parseInt(process.env.db_port),
    "corsOptions": process.env.corsOptions,
};

module.exports = config;