const { Router } = require("express");
const {
  getAllData,
  getOneData,
  addData,
  updateData,
  deleteData,
  updateadmin,
  getAllCar,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
  getAllLaptop,
  getOneLaptop,
  addLaptop,
  updateLaptop,
  deleteLaptop,
} = require("../controller/data.controller");
const {
  authorization,
  authorization2,
} = require("../middleware/authorization");

const dataRouter = Router();

dataRouter.get("/get_all_data", getAllData);
dataRouter.get("/get_one_data/:id", getOneData);
dataRouter.post("/add_data", authorization, addData);
dataRouter.put("/update_data/:id", authorization, updateData);
dataRouter.delete("/delete_data/:id", authorization, deleteData);

// superadmin uchun
dataRouter.put("/update_user/:id", authorization2, updateadmin);

//                                                             qoshimcha

//car
dataRouter.get("/get_all_car", getAllCar);
dataRouter.get("/get_one_car", getOneCar);
dataRouter.post("/add_car", addCar);
dataRouter.put("/update_car", updateCar);
dataRouter.delete("/delete_car", deleteCar);

//laptop
dataRouter.get("/get_all_laptop", getAllLaptop);
dataRouter.get("/get_one_laptop", getOneLaptop);
dataRouter.post("/add_laptop", addLaptop);
dataRouter.put("/update_laptop", updateLaptop);
dataRouter.delete("/delete_laptop", deleteLaptop);
module.exports = dataRouter;
