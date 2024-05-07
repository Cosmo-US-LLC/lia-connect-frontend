import AuthApi from "./authApi";

const authApi = new AuthApi();

export const login = (user, cb) => async () => {
  try {
    const { data, status } = await authApi.login(user);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const registerUser = (formData, cb) => async () => {
  try {
    const { data, status } = await authApi.registerUser(formData);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const forgotPassword = (formData, cb) => async () => {
  try {
    const { data, status } = await authApi.forgotPassword(formData);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const resetPassword = (formData, cb) => async () => {
  try {
    const { data, status } = await authApi.resetPassword(formData);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};
