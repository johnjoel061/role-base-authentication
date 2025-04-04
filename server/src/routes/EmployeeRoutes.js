//External Lib Import
const EmployeeRoutes = require("express").Router();
const EmployeeControllers = require("../controller/Employee/EmployeeControllers");

//Internal Lib Import
const {
  CheckEmployeeAuth,
  CheckAdminAuth,
} = require("../middleware/CheckAuthLogin");

//Employee Create
EmployeeRoutes.post(
  "/EmployeeCreate",
//    CheckEmployeeAuth,
//    CheckAdminAuth,
  EmployeeControllers.EmployeeCreate
);

module.exports = EmployeeRoutes;

