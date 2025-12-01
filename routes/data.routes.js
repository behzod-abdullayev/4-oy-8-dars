const {Router} = require("express")
const { getAllData, getOneData, addData, updateData, deleteData, updateadmin } = require("../controller/data.controller")
const {authorization, authorization2} = require("../middleware/authorization")

const dataRouter = Router();

dataRouter.get("/get_all_data", getAllData);
dataRouter.get("/get_one_data/:id", getOneData);
dataRouter.post("/add_data", authorization, addData);
dataRouter.put("/update_data/:id", authorization, updateData);
dataRouter.delete("/delete_data/:id", authorization, deleteData);

// superadmin uchun
dataRouter.put("/update_user/:id", authorization2, updateadmin);

module.exports = dataRouter;
