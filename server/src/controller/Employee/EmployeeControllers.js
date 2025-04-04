//Internal Lib Import
const mongoose = require("mongoose");

//Internal Lib import
const EmployeeModel = require("../../model/Employee/EmployeeModel");
const OtpModel = require("../../model/Otps/OtpModel");
const EmployeeCreateService = require("../../services/Employee/EmployeeCreateService");

/**
 * @desc Employee Create
 * @access private
 * @route /api/v1/Employee/EmployeeCreate
 * @methud POST
 */
const EmployeeCreate = async (req, res, next) => {
  try {
    const result = await EmployeeCreateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  EmployeeCreate,
};
