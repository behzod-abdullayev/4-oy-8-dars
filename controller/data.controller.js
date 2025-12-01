const { read_file, write_file } = require("../managing/manage");
const { v4 } = require("uuid");
// get
const getAllData = async (req, res) => {
  try {
    const korzinka = read_file("korzinka.json");
    res.status(200).json(korzinka);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one

const getOneData = async (req, res) => {
  try {
    const { id } = req.params;
    const korzinka = read_file("korzinka.json");
    const foundkorzinka = korzinka.find((item) => item.id === id);

    if (!foundkorzinka) {
      return res.status(404).json({
        message: "korzinka not found",
      });
    }
    res.status(200).json(foundkorzinka);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//post

const addData = async (req, res) => {
  try {
    const { name, group, type } = req.body;
    const fileData = read_file("korzinka.json");
    fileData.push({
      id: v4(),
      name,
      group,
      type,
    });

    write_file("korzinka.json", fileData);
    res.status(201).json({
      message: "added new korzinka",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//put

const updateData = async (req, res) => {
  try {
    const { name, group, type } = req.body;
    const { id } = req.params;
    const korzinka = read_file("korzinka.json");
    const foundkorzinka = korzinka.find((item) => item.id === id);
    if (!foundkorzinka) {
      return res.status(404).json({
        message: "korzinka not found",
      });
    }
    korzinka.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
        item.group = group ? group : item.group;
        item.type = type ? type : item.type;
      }
    });

    write_file("korzinka.json", korzinka);
    res.status(200).json({
      message: "updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const korzinka = read_file("korzinka.json");
    const foundkorzinka = korzinka.find((item) => item.id === id);
    if (!foundkorzinka) {
      return res.status(404).json({
        message: "korzinka not found",
      });
    }
    korzinka.forEach((item, idx) => {
      if (item.id === id) {
        korzinka.splice(idx, 1);
      }
    });

    write_file("korzinka.json", korzinka);
    res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
    getAllData,
    getOneData,
    addData,
    updateData,
    deleteData
}