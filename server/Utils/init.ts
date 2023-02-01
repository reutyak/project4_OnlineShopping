//just example you have to change them as needed

export const create_firstDBtable = "CREATE TABLE IF NOT EXISTS firstDBtable (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(45) NULL,node_id INT NULL,max_value INT NULL,min_value INT NULL, value INT NULL, PRIMARY KEY (id));"
export const create_secondDBtable = "CREATE TABLE IF NOT EXISTS secondDBtable (id INT NOT NULL AUTO_INCREMENT,device_type INT NULL,name VARCHAR(45) NULL,start_value INT NULL,end_value INT NULL, start_date DATETIME NULL,end_date DATETIME NULL,PRIMARY KEY (id));";