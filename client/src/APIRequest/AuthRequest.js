import ToastMessage from "../helpers/ToastMessage";
import { SetLogin } from "../redux/slices/AuthSlice";
import { SetUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AuthRequest {
  static async RegisterUser(postBody) {
    const data = await RestClient.postRequest("/Auth/RegisterUser", postBody);
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
    return false;
  }

  static async LoginUser(postBody) {
    try {
      const data = await RestClient.postRequest("/Auth/LoginUser", postBody);
      console.log("Login Response Data:", data); // Optional: can be removed after testing

      if (data?.AccessToken && data?.UserDetails) {
        store.dispatch(SetLogin(data.AccessToken));
        store.dispatch(SetUserDetails(data.UserDetails));
        ToastMessage.successMessage("User Login Successful");
        return true;
      } else {
        console.error("Login failed: Missing token or user details.");
        return false;
      }
    } catch (error) {
      console.error("LoginUser Exception:", error);
      return false;
    }
  }
}

export default AuthRequest;
