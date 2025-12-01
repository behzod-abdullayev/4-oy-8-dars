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
//superadmin uchun
const updateadmin = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const users = read_file("user.json");
    const foundUser = users.find((item) => item.id === id);

    if (!foundUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    users.forEach((item) => {
      if (item.id === id) {
        item.role = role || item.role;
      }
    });

    write_file("user.json", users);

    res.status(200).json({
      message: "role updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//                                                      qoshimcha

//                                                         car
// get

const getAllCar = async (req, res) => {
  try {
    const car = read_file("car.json");
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one

const getOneCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = read_file("car.json");
    const foundcar = car.find((item) => item.id === id);

    if (!foundcar) {
      return res.status(404).json({
        message: "car not found",
      });
    }
    res.status(200).json(foundcar);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//post

const addCar = async (req, res) => {
  try {
    const { name, brand, engine, meal, type, zeroToHundered, hp } = req.body;
    const fileData = read_file("car.json");
    fileData.push({
      id: v4(),
      name,
      brand,
      engine,
      meal,
      type,
      zeroToHundered,
      hp,
    });

    write_file("car.json", fileData);
    res.status(201).json({
      message: "added new car",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//put

const updateCar = async (req, res) => {
  try {
    const { name, brand, engine, meal, type, zeroToHundered, hp } = req.body;
    const { id } = req.params;
    const car = read_file("car.json");
    const foundcar = car.find((item) => item.id === id);
    if (!foundcar) {
      return res.status(404).json({
        message: "car not found",
      });
    }
    car.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
        item.brand = brand ? brand : item.brand;
        item.engine = engine ? engine : item.engine;
        item.meal = meal ? meal : item.meal;
        item.type = type ? type : item.type;
        item.zeroToHundered = zeroToHundered
          ? zeroToHundered
          : item.zeroToHundered;
        item.hp = hp ? hp : item.hp;
      }
    });

    write_file("car.json", car);
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

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = read_file("car.json");
    const foundcar = car.find((item) => item.id === id);
    if (!foundcar) {
      return res.status(404).json({
        message: "car not found",
      });
    }
    car.forEach((item, idx) => {
      if (item.id === id) {
        car.splice(idx, 1);
      }
    });

    write_file("car.json", car);
    res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//                                                     laptop
//get
const getAllLaptop = async (req, res) => {
  try {
    const laptop = read_file("laptop.json");
    res.status(200).json(laptop);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get_one

const getOneLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = read_file("laptop.json");
    const foundlaptop = laptop.find((item) => item.id === id);

    if (!foundlaptop) {
      return res.status(404).json({
        message: "laptop not found",
      });
    }
    res.status(200).json(foundlaptop);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//add laptop

const addLaptop = async (req, res) => {
  try {
    const { name, brand, CPU, GPU, ROM, RAM } = req.body;
    const fileData = read_file("laptop.json");
    fileData.push({
      id: v4(),
      name,
      brand,
      CPU,
      GPU,
      ROM,
      RAM,
    });

    write_file("laptop.json", fileData);
    res.status(201).json({
      message: "added new laptop",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update laptop

const updateLaptop = async (req, res) => {
  try {
    const { name, brand, CPU, GPU, ROM, RAM } = req.body;
    const { id } = req.params;
    const laptop = read_file("laptop.json");
    const foundlaptop = laptop.find((item) => item.id === id);
    if (!foundlaptop) {
      return res.status(404).json({
        message: "laptop not found",
      });
    }
    laptop.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
        item.brand = brand ? brand : item.brand;
        item.CPU = CPU ? CPU : item.CPU;
        item.GPU = GPU ? GPU : item.GPU;
        item.ROM = ROM ? ROM : item.ROM;
        item.RAM = RAM ? RAM : item.RAM;
      }
    });

    write_file("laptop.json", laptop);
    res.status(200).json({
      message: "updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete laptop

const deleteLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = read_file("laptop.json");
    const foundlaptop = laptop.find((item) => item.id === id);
    if (!foundlaptop) {
      return res.status(404).json({
        message: "laptop not found",
      });
    }
    laptop.forEach((item, idx) => {
      if (item.id === id) {
        laptop.splice(idx, 1);
      }
    });

    write_file("laptop.json", laptop);
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
};
