const assignModel = require("../model/RoleAssign");

const getAllPersonal = async (req, res) => {
  try {
    const users = await assignModel.getFullPersonal()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { email, newRole } = req.body;

    // Check if required fields are provided
    if (!email || !newRole) {
      return res.status(400).json({
        success: false,
        message: "Email and newRole are required.",
      });
    }

    // Update role in DB
    const result = await assignModel.updateRoleByEmail(email,newRole)

    // Check if any row was affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found or role not updated.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully.",
    });

  } catch (error) {
    console.error("Error updating role:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating role.",
    });
  }
};

const deleteAdminByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await assignModel.deleteUserByEmail(email);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports ={getAllPersonal,updateRole,deleteAdminByEmail}