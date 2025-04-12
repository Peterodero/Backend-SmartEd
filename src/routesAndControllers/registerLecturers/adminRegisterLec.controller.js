const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

// Register a new lecturer
const registerLecturer = async (req, res) => {
  const { name, email, password, department, role } = req.body;

  if (!name || !email || !password || !department || role !== 'lecturer') {
    return res.status(400).json({ message: 'All fields are required and the role must be "lecturer"' });
  }

  try {
    // Check if the lecturer already exists
    const existingLecturer = await User.findOne({ email });
    if (existingLecturer) {
      return res.status(400).json({ message: 'Lecturer already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new lecturer
    const lecturer = new User({
      name,
      email,
      password: hashedPassword,
      department,
      role,
    });

    // Save the lecturer to the database
    await lecturer.save();

    res.status(201).json({ message: 'Lecturer registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerLecturer,
};
