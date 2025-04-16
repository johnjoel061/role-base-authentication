//External Lib Import
import axios from "axios";
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import { SetLogout } from "../redux/slices/AuthSlice";
import { RemoveLoading, SetLoading } from "../redux/slices/LoaderSlice";
import { RemoveUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";

//Axios default setting
axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

function axiosHeaders() {
  axios.defaults.headers.common["Authorization"] = "Bearer " + SessionHelper.GetToken();
}

const ResponseReturn = (response) => {
  store.dispatch(RemoveLoading());
  return response.data; // ✅ Only return the data
};

const ErrorReturn = (error) => {
  store.dispatch(RemoveLoading());
  if (error.response?.status === 500) {
    ToastMessage.errorMessage("Sorry, Something went wrong");
  } else if (error.response?.status === 401) {
    ToastMessage.errorMessage(error.response.data?.message || "Unauthorized");
    store.dispatch(SetLogout());
    store.dispatch(RemoveUserDetails());
  } else {
    ToastMessage.errorMessage(error.response?.data?.message || "An error occurred");
  }

  return false;
};

class RestClient {
  static async getRequest(url) {
    store.dispatch(SetLoading());
    axiosHeaders();
    return axios.get(url)
      .then(ResponseReturn)
      .catch(ErrorReturn);
  }

  static async postRequest(url, postBody) {
    store.dispatch(SetLoading());
    axiosHeaders();
    return axios.post(url, postBody)
      .then(ResponseReturn)
      .catch(ErrorReturn);
  }

  static async updateRequest(url, postBody) {
    store.dispatch(SetLoading());
    axiosHeaders();
    return axios.patch(url, postBody)
      .then(ResponseReturn)
      .catch(ErrorReturn);
  }

  static async putRequest(url, postBody) {
    store.dispatch(SetLoading());
    axiosHeaders();
    return axios.put(url, postBody)
      .then(ResponseReturn)
      .catch(ErrorReturn);
  }

  static async deleteRequest(url) {
    store.dispatch(SetLoading());
    axiosHeaders();
    return axios.delete(url)
      .then(ResponseReturn)
      .catch(ErrorReturn);
  }
}

export default RestClient;
