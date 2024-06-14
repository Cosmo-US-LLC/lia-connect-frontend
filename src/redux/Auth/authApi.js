import { INSTANCE } from "../../Config/axiosInstance";

export default class AuthApi {
  login = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/login",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  Linkedinlogin = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/linked-in/login",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  registerUser = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/register",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  forgotPassword = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/forgot-password",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  resetPassword = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/reset-password",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
}
