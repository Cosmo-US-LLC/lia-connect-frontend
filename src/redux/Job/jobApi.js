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
    fetchJobs = async (formPayload) => {
      return new Promise((resolve, reject) => {
        INSTANCE({
          method: "POST",
          url: "/jobs/filter?" + formPayload.urlParams,
          data:formPayload.body
        })
          .then(resolve)
          .catch(reject);
      });
    };

  }
  



  