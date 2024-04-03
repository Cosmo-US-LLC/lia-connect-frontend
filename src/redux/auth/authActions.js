import AuthApi from "./authApi";

const authApi = new AuthApi();

export const login = (user, cb) => async () => {
  try {
    const { data } = await authApi.login(user);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const registerUser = (formData, cb) => async () => {
  try {
    const { data } = await authApi.registerUser(formData);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const forgotPassword = (formData, cb) => async () => {
  try {
    const { data } = await authApi.forgotPassword(formData);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const resetPassword = (formData, cb) => async () => {
  try {
    const { data } = await authApi.resetPassword(formData);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};
