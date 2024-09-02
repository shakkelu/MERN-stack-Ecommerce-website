import bcrypt from "bcrypt"; // Assuming bcrypt for hashing
import userModel from "../models/user.js";
import Dashboard from "../models/userDashboard.js";
import JWT from "jsonwebtoken";

/* 

Register controller ( or signup function)

*/

export const registercontroller = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) return res.status(400).send({ message: "Name is required" });
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });
    if (!phone) return res.status(400).send({ message: "Phone is required" });
    if (!address)
      return res.status(400).send({ message: "Address is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).send({
        success: "false",
        message: "User already exists, please login or create new user",
      });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register new user
    const newUser = new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a dashboard for the new user
    const newDashboard = new Dashboard({
      userId: newUser._id,
      // Initialize other fields if needed
    });

    await newDashboard.save();

    res.status(200).send({
      success: "true",
      message: "User registered successfully, now login with new user",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: "false", message: "Error in registration", error });
  }
};

/* 

Login controller

*/

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send({
        success: "false",
        message: "Invalid email or password!, please try again",
      });
    }

    // Find the user by email
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({
        success: "false",
        message: "User doesn't exist!, please signup",
      });
    }

    // Verify the password
    const verification = await bcrypt.compare(password, existingUser.password);

    // Check verification
    if (!verification) {
      return res.status(400).send({
        success: "false",
        message: "Incorrect password!, please try again",
      });
    } else {
      const token = await JWT.sign(
        { _id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).send({
        success: "true",
        message: "Login successfull, welcome back",
        user: {
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
          address: existingUser.address,
        },
        token,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: "false", message: "Error in login", error });
  }
};

/*

Forgot password controller

*/

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({
        success: "false",
        message: "User doesn't exist!, please signup",
      });
    } else {
      const securityQuestion = await existingUser.securityQuestion;
      return res.status(200).send({
        success: "true",
        message: securityQuestion,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: "false", message: "Error in login", error });
  }
};

/*

security question answer controller

*/
export const answerController = async (req, res) => {};

/*

private content 

*/
export const privatecontent = (req, res) => res.send("private content here");
