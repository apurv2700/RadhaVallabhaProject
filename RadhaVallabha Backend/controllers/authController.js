const { db } = require("../config/firebase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Signup
exports.signup = async (req, res) => {
  const { name, email, password, phone, gender, dob, status, role } = req.body;

  try {
    // Check if user already exists
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = db.collection('users').doc();

    await userRef.set({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      status,
      role,
      createdAt: new Date().toISOString()
    });

    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const doc = snapshot.docs[0];
    const userData = doc.data();

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: doc.id, email: userData.email, role: userData.role }, JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: doc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status :userData.status,
        phone:userData.phone,
        dob:userData.dob,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


// forgot_password
exports.forgot_password = async (req, res) => {
  try {
    const { email } = req.body;

    const actionCodeSettings = {
      url: 'https://radhavallabha-59801.firebaseapp.com/reset-password', // must be in authorized domains
      handleCodeInApp: false,
    };

    const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

    // Send this link via email using nodemailer (or show in UI for dev testing)
    res.status(200).json({ message: 'Reset link sent successfully', resetLink: link });

  } catch (error) {
    console.error('Error generating reset link:', error);
    res.status(500).json({ error: error.message });
  }
};
