//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");
const { HashPassword } = require("../../utility/BcryptHelper");

const EmployeeCreateService = async (Request, DataModel) => {
  let PostBody = Request.body;

  const Employee = await DataModel.aggregate([
    {
      $match: { email: PostBody.email },
    },
  ]);

  if (Employee.length > 0) {
    throw CreateError("Employee Already Created", 400);
  }
  
  PostBody.password = await HashPassword(PostBody.password);

  await DataModel.create(PostBody);
  return { message: "Employee Create Successful" };
};
module.exports = EmployeeCreateService;
