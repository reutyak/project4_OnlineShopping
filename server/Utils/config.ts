// Configuration

import { extend } from "../node_modules/joi/lib/index";
import dotenv from "dotenv";
dotenv.config()

class Config { 
    public port = 3001; 
    // mysql database
    // public mySQLhost = "localhost";
    // public mySQLUser = "root";
    // public mySQLPassword = "12345678";
    // public mySQLdb = "nameDB";
    //another database
}

const userName = "root";
const password = "12345678";

class DevelopmentConfig extends Config{
    public isDevelopment = true;
    public connectionString = `mongodb://localhost:27017/onlineSuper`;
};

class ProductionConfig extends Config{
    public isDevelopment = false;
    public connectionString = `mongodb://${userName}:${password}@localhost:27017/onlineSuper`;
};
const config = process.env.MODE_ENV==="production"?new ProductionConfig: new DevelopmentConfig;
export default config