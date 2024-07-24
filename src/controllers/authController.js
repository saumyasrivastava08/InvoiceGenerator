const { getUserByEmail, createUser } = require("../services/userServices"); // Adjust path accordingly
const bcrypt = require("bcryptjs"); // Ensure bcryptjs is imported
const User = require("../models/User"); // Ensure the correct path to the User model
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  try {
    let user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await createUser(name, email, password);

    const payload = {
      user: {
        id: newUser._id, // Adjust this if your service returns the user object
      },
    };

    jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Log password before comparison
    console.log("Password provided:", password);
    console.log("Hashed Password in DB:", user.password);

    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error during bcrypt compare:", err);
        return res.status(500).send("Server error");
      }

      console.log("Password match:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "your_jwt_secret",
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error("Error during JWT sign:", err);
            return res.status(500).send("Server error");
          }
          res.json({ token });
        },
      );
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Server error");
  }
};
