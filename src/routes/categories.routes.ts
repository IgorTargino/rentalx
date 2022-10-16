import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

const categoriesRoutes = Router();

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
})

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
})

export { categoriesRoutes };