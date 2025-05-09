import { INSTANCE } from "../../Config/axiosInstance";

export default class JobApi {
  stepOne = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/jobs",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  stepTwo = async (formPayload) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PATCH",
        url: "/jobs/add-sequence/" + formPayload.jobId,
        data: formPayload.body,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  updateJob = async (formPayload) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PATCH",
        url: "/jobs/" + formPayload.jobId,
        data: formPayload.body,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  fetchJobs = async (formPayload) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/jobs/filter?" + formPayload.urlParams,
        data: formPayload.body,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  fetchAllCandidate = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/jobs/candidates-count",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  fetchJobDetail = async (url) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: url,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  fetchStats = async (url) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: url,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  deleteJob = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "DELETE",
        url: "/jobs/" + id,
      })
        .then(resolve)
        .catch(reject);
    });
  };
}
