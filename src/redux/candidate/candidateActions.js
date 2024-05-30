import CandidateApi from "./candidateApi";

const candidateApi = new CandidateApi();



export const fetchCandidates = (formPayload, cb) => async () => {
  try {
    const { data, status } = await candidateApi.fetchCandidates(formPayload);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};


export const fetchCandidateDetails = (id, cb) => async () => {
  try {
    const { data, status } = await candidateApi.fetchCandidateDetails(id);
    cb({ data, status });
  } catch (error) {
    cb(error?.response?.data);
  }
};

