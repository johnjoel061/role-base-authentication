//Internal Lib Import
const CreateToken = require("../../utility/CreateToken");
const { CreateError } = require("../../helper/ErrorHandler");
const { VerifyPassword } = require("../../utility/BcryptHelper");

const LoginService = async (Request, DataModel) => {
  const { email, password } = Request.body;

  if (!email || !password) {
    throw CreateError("Invalid Data", 400);
  }
  const user = await DataModel.aggregate([{ $match: { email } }]);

  if (!user.length > 0) {
    throw CreateError("User Not found", 404);
  }

  const verifyPassword = await VerifyPassword(password, user[0].password);
  if (!verifyPassword) {
    throw CreateError("Unauthorized Credentials", 401);
  }

  const payLoad = {
    id: user[0]._id,
  };

  delete user[0].Password;

  const token = await CreateToken(payLoad);

  return { accessToken: token, userDetails: user[0] };
};

module.exports = LoginService;
