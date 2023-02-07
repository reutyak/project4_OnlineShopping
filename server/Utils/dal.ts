import config from "../Utils/config";
import mongoose from "mongoose";


const url = config.connectionString;
mongoose.set('strictQuery', false)

const connection = (): Promise<any> => {
    mongoose.connect(url);
    const db = mongoose.connection;
    return new Promise<any>((resolve: any, reject: any) => {
      db.on('error', (err) => {
        if (err) {
          reject(err)
          return
        }
        db.once('open', () => {
          console.log("connection started")
        })
        resolve()
      })
    })
  }

  export default connection;
