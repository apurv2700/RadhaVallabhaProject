const { db } = require("../config/firebase");
const bcrypt = require("bcrypt");

exports.uploadProfileImage = async (req, res) => {
  const { userId } = req.params;
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const imageUrl = `http://192.168.1.47:3000/uploads/${req.file.filename}`;
  try {
    await db.collection("users").doc(userId).update({ profileImage: imageUrl });
    res.json({ message: "Profile image uploaded", imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { phone, password } = req.body;
  const updates = {};

  try {
    if (phone) updates.phone = phone;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); //Hash password
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }

    await db.collection("users").doc(userId).update(updates);

    res.json({ message: "Profile updated successfully", updates });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];

    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ users });
  } catch (err) {
    console.error(' Error fetching users:', err);
    res.status(500).json({
      message: 'Failed to fetch users',
      error: err.message,
    });
  }
};

// get users by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userDoc = await db.collection('users').doc(id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    res.status(200).json({ user: { id: userDoc.id, ...userData } });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// update users information by admin
exports.updateUser = async (req, res) => {
  try {
    const { id, name, phone, devotionalLevel, role, status } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const updateData = {
      name,
      phone,
      devotionalLevel,
      role,
    };

    if (status) {
      updateData.status = status; //only add if defined
    }

    await userRef.update(updateData);
    const updatedDoc = await userRef.get();
    res.json({ success: true, user: updatedDoc.data() });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};