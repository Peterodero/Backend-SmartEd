const User = require("../../models/user.model");

// Get user by ID
exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };
  
  // Update user
  exports.updateUser = async (req, res) => {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  