const { read_file, write_file } = require("../managing/manage");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const sendMessage = require("../utils/email-sender");
const tokenGenerator = require("../utils/token-generator");
//register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "email password and username are required",
      });
    }
    const data = read_file("user.json");
    const foundEmail = data.find((item) => item.email === email);

    if (foundEmail) {
      return res.status(401).json({
        message: "email already exist",
      });
    }

    const foundusername = data.find((item) => item.username === username);
    if (foundusername) {
      return res.status(401).json({
        message: "username already exist",
      });
    }
    const hash = await bcrypt.hash(password, 12);

    const generatedCode = +Array.from({ length: 6 }, () =>
      Math.ceil(Math.random() * 9)
    ).join("");
    console.log(generatedCode);

    await sendMessage(email, generatedCode);

    data.push({
      id: v4(),
      username,
      email,
      role: "user",
      password: hash,
    });

    write_file("user.json", data);
    res.status(201).json({
      message: "registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({
        message: "email, password are required",
      });
    }
    const data = read_file("user.json");
    const foundUser = data.find((item) => item.email === email);

    if (!foundUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const decode = await bcrypt.compare(password, foundUser.password);

    if (decode) {
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      const token = tokenGenerator(payload);
      res.status(200).json({
        message: "succes",
        token,
      });
    } else {
      res.status(401).json({
        message: "wrong password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
