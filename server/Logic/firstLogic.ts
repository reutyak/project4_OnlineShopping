// All logical operations of the backend folder will displayed here.
// importations 
import dal_mysql from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import { FirstModel } from "../Models/firstModel";


// functions( async / await ) for getting data from DB
const getAllFirst = async (): Promise<FirstModel[]> => {
    // command line for the DB
    //it's just example you have to change as needed
    const sql = "SELECT * FROM firstDBtable";
    // a promise function that connects us to the database with the command line
    const result =  await dal_mysql.execute(sql);
    return result
     ;
}

const getSingleByID = async (id: number): Promise<FirstModel> => {
    const sql = `SELECT * FROM firstDBtable WHERE id=${id}`;
    const response = await dal_mysql.execute(sql);
    return response;
}

const addFirst = async (something: FirstModel): Promise<FirstModel> => {
    // command line for the DB
    //it's just example you have to change as needed
    const sql = `
    INSERT INTO firstDBtable (name, node_id, max_value, min_value, value) VALUES ('${something.name}','${something.node_id}','${something.minimum_value}','${something.maximum_value}','${something.value}')
    `
    const response : OkPacket = await dal_mysql.execute(sql);
    something.id = response.insertId;
    return something;

} 

const deleteFirst = async (id: number): Promise<void> => {
    const sql = `DELETE FROM firstDBtable WHERE id=${id}`
    const response = await dal_mysql.execute(sql);
    
}

const updateFirst = async (something: FirstModel): Promise<FirstModel> => {
    const sql = `
    UPDATE firstDBtable 
    SET name = '${something.name}',node_id = '${something.node_id}',minimum_value = '${something.minimum_value}',maximum_value = '${something.maximum_value}', value = '${something.value}'
    WHERE id = ${something.id}
    `;
    const response : OkPacket = await dal_mysql.execute(sql);
    return something;
}

//update value
const changeValue = async(deviceId:number,value:number):Promise<void>=>{
    const sql = `UPDATE device_type SET value=${value} WHERE id=${deviceId}`;
    await dal_mysql.execute(sql);
}

// exporting 
export default {
    getAllFirst,
    getSingleByID,
    addFirst,
    deleteFirst,
    updateFirst,
    changeValue
}