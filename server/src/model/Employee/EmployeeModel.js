//External Lib Import
const { model, Schema } = require("mongoose");

const EmployeesSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (prop) => `Invalid Email Address: ${prop.value}`,
      },
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: ["EMPLOYEE", "HOD", "ADMIN"],
      default: "EMPLOYEE",
      required: true,
    },

  },
  { versionKey: false, timestamps: true },
);

const EmployeesModel = model("Employee", EmployeesSchema);
module.exports = EmployeesModel;
