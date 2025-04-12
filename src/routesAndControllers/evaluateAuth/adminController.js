const User = require('../../models/user.model'); 

async function getAdminDashboard(req, res) {
  try {
    // Count the number of lecturers
    const lecturerCount = await User.countDocuments({ role: 'lecturer' });

    const students = await User.find({ role: 'student' }); 

    res.status(200).json({
      lecturerCount, 
      students, 
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
}

module.exports = {
  getAdminDashboard,
};
