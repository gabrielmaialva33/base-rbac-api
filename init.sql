CREATE DATABASE base_rbac_db;
CREATE DATABASE base_rbac_db_development;
CREATE DATABASE base_rbac_db_testing;

GRANT ALL PRIVILEGES ON DATABASE base_rbac_db TO postgres;
GRANT ALL PRIVILEGES ON DATABASE base_rbac_db_development TO postgres;
GRANT ALL PRIVILEGES ON DATABASE base_rbac_db_testing TO postgres;