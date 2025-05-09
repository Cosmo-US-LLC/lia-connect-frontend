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

// action creator
export const stepTwo = (user) => async (dispatch) => {
  try {
    const { data, status } = await jobApi.stepTwo(user);
    return { data, status };
  } catch (error) {
    return { error: error?.response?.data };
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

export const fetchStats = (url, cb) => async () => {
  try {
    const { data, status } = await jobApi.fetchStats(url);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const fetchAllCandidates = (formPayload, cb) => async () => {
  try {
    const { data, status } = await jobApi.fetchAllCandidate(formPayload);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};


export const fetchJobDetails = (url, cb) => async () => {
  try {
    const { data, status } = await jobApi.fetchJobDetail(url);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const deleteJobAction = (id, cb) => async () => {
  try {
    const { data, status } = await jobApi.deleteJob(id);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

