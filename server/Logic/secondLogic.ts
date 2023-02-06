// // import dal_mysql from "../Utils/dal_mysql";
// import { OkPacket } from "mysql";
// import { SecondModel } from "../Models/secondModel";

// // functions( async / await ) for getting data from DB
// const getAllSecond = async (): Promise<SecondModel[]> => {
//     // command line for the DB - it's just example you have to change as needed
//     const sql = "SELECT secondDBtable.* , firstDBtable.name as device_type FROM secondDBtable JOIN firstDBtable ON secondDBtable.device_type = firstDBtable.id";
//     // a promise function that connects us to the database with the command line
//     const result =  await dal_mysql.execute(sql);
//     return result
//      ;
// }

// const addSecond = async (something: SecondModel): Promise<SecondModel> => {
//     // command line for the DB
//     //it's just example you have to change as needed
//     const sql = `
//     INSERT INTO secondDBtable (device_type, name, start_value, end_value, start_date, end_date) VALUES ('${something.device_type}', '${something.name}', '${something.start_value}', '${something.end_value}', '${something.start_date}', '${something.end_date}');
//     `;
//     const response : OkPacket = await dal_mysql.execute(sql);
//     something.id = response.insertId;
//     return something;

// } 

// const deleteSecond = async (id: number): Promise<void> => {
//     const sql = `DELETE FROM scenario WHERE id=${id}`
//     await dal_mysql.execute(sql);
    
// }

// const updateSecond = async (something: SecondModel): Promise<SecondModel> => {
//     //it's just example you have to change as needed
//     const sql = `
//     UPDATE secondDBtable 
//     SET device_type = '${something.device_type}',name = '${something.name}',start_value = '${something.start_value}',end_value = '${something.end_value}', start_date = '${something.start_date}', end_date = '${something.end_date}
//     WHERE id = ${something.id}
//     `;
//     const response : OkPacket = await dal_mysql.execute(sql);
//     return something;
// }

// // exporting 
// export default {
//     getAllSecond,
//     addSecond,
//     deleteSecond,
//     updateSecond
// }




