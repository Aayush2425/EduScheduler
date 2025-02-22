const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/AdminModel.js");

// get all details of admin by id
const getAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting admin", details: error.message });
  }
};

// Update Admin Details
const updateAdmin = async (req, res) => {
  const adminId = req.params.id;

  //  universityEmail , username , password , personalUniEmail
  const updates = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
      new: true,
    });
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating admin", details: error.message });
  }
};

const signupAdmin = async (req, res) => {
  let { password,  universityName,universityEmail,username  } = req.body;
  console.log(password, universityName, username,universityEmail);
  
  try {
    const adminExist = await Admin.findOne({
      username: username,
    });

    if (adminExist) {
      console.log("admin exist!!!");
      return res.status(422).json({ error: "Admin already exists" });
    }

    let hashPassword = await bcrypt.hash(password, 12);
    password = hashPassword;

    const newAdmin = await Admin({
      username,
      password,
      universityEmail,
      universityName,
    });
    await newAdmin.save();

    const token = jwt.sign({ _id: newAdmin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);
    
    newAdmin.token = token;
    console.log(newAdmin);
    
    await newAdmin.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    return res.status(200).send({ data: newAdmin });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
};

const signinAdmin = async (req, res) => {
  let { universityEmail, password } = req.body;

  try {
    if (!universityEmail || !password) {
      return res.status(422).json({ message: "please enter required details" });
    }

    const loginAdmin = await Admin.findOne({
      universityEmail: universityEmail,
    });

    if (!loginAdmin) {
      return res.status(400).send({ message: "Invalid details" });
    }

    let isMatch = await bcrypt.compare(password, loginAdmin.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid details" });
    }
    const token = jwt.sign({ _id: loginAdmin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    loginAdmin.token = token;
    await loginAdmin.save();

    return res.status(200).send({ data: loginAdmin });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
};

module.exports = { signupAdmin, signinAdmin, updateAdmin, getAdmin };
