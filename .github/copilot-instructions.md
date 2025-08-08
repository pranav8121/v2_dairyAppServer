DB Schema:
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARBINARY(512) NOT NULL,
    en_name VARCHAR(500),
    mr_name VARCHAR(500),
    multi INT,
    status TINYINT(1) DEFAULT 1
);

CREATE TABLE dairy_member (
    id INT PRIMARY KEY AUTO_INCREMENT,              
    mr_name VARCHAR(255),                          
    en_name VARCHAR(255),                           
    dairy_id INT,                                          
    type ENUM('buffalow', 'cow') NOT NULL,         
    phone VARCHAR(15),                              
    mst_id INT,  --Foreign key to admin_users.id
    password VARBINARY(512) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE                                  
);

CREATE TABLE milk_entry (
    id CHAR(24) PRIMARY KEY,
    mem_id INT,
    entry_timestamp DATETIME,
    qty DECIMAL(7,3),              -- e.g., 10 or 999.999
    fat DECIMAL(4,1),              -- e.g., 9.9
    snf DECIMAL(4,1),              -- e.g., 9.9
    rate DECIMAL(7,3),             -- e.g., 999.999
    total_rate DECIMAL(7,3),       -- e.g., 999.999
    en_milking_shift VARCHAR(20),
    mr_milking_shift VARCHAR(50),
    FOREIGN KEY (mem_id) REFERENCES dairy_member(id)
);