//External Lib Import
const { model, Schema } = require("mongoose");

const EmployeesSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
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
    password: {
      type: String,
      required: true,
    },
    role: {
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
