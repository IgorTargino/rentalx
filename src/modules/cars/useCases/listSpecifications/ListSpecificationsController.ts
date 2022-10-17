import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController{
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase){}

  handle(request: Request, response: Response){
    const all = this.listSpecificationsUseCase.execute();

    response.json(all);
  }
}

export { ListSpecificationsController };