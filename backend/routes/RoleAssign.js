const express = require("express")
const router = express.Router()
const assignController = require("../controllers/RoleAssign")


router.get('/allpersonal', assignController.getAllPersonal );
router.put('/change-role',assignController.updateRole);
router.delete("/users/:email", assignController.deleteAdminByEmail);


module.exports = router