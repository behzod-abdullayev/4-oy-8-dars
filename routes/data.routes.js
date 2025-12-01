const {Router} = require("express")
const { getAllData, getOneData, addData, updateData, deleteData } = require("../controller/data.controller")
const authorization = require("../middleware/authorization")


const dataRouter = Router()

dataRouter.get("/get_all_data", getAllData)
dataRouter.get("/get_one_data/:id", getOneData)
dataRouter.post("/add_data", authorization, addData)
dataRouter.put("/update_data/:id", authorization, updateData)
dataRouter.delete("/delete_data/:id", authorization, deleteData)


module.exports = dataRouter