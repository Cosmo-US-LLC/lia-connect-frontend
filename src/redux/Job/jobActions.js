import JobApi from "./jobApi";

const jobApi = new JobApi();

export const stepOne = (user, cb) => async () => {
  try {
    const { data, status } = await jobApi.stepOne(user);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const stepTwo = (user, cb) => async () => {
  try {
    const { data, status } = await jobApi.stepTwo(user);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const updateJob = (user, cb) => async () => {
  try {
    const { data, status } = await jobApi.updateJob(user);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const fetchJobs = (formPayload, cb) => async () => {
  try {
    const { data, status } = await jobApi.fetchJobs(formPayload);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};
