// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import dal_mysql from '../Utils/dal_mysql';
import firstLogic from '../Logic/firstLogic';

const firstController = express.Router();

firstController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    //get all devices
    response.status(200).json(await firstLogic.getAllFirst());
  })

  firstController.get("/:id",async (request: Request, response: Response, next: NextFunction) => {
    const deviceID = +request.params.id
    response.status(200).json(await firstLogic.getSingleByID(deviceID));
  })

  firstController.post("/",async (request: Request, response: Response, next: NextFunction) => {
     const newDevice = request.body;
     response.status(201).json(await firstLogic.addFirst(newDevice));
  })

  // delete information from DB
  firstController.delete("/", async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json( await firstLogic.deleteFirst(someData))
})


  //update value
  firstController.get("/:id/:value",async (request: Request, response: Response, next: NextFunction) => {
    const deviceId = +request.params.id;
    const deviceValue = +request.params.value;
    response.status(201).json(await firstLogic.changeValue(deviceId,deviceValue));
  })

  //update value -  another way
  firstController.put("/",async (request: Request, response: Response, next: NextFunction) => {
    const deviceId = +request.body["deviceID"];
    const deviceValue =+request.body["value"];
    response.status(201).json(await firstLogic.changeValue(deviceId,deviceValue));
  })
  

export default firstController;


