import { INSTANCE } from "../../Config/axiosInstance";


export default class CandidateApi {

    
    fetchCandidates = async (formPayload) => {
      return new Promise((resolve, reject) => {
        INSTANCE({
          method: "POST",
          url: "/candidate/filter?" + formPayload.urlParams,
          data:formPayload.body
        })
          .then(resolve)
          .catch(reject);
      });
    };

    fetchCandidateDetails = async (id) => {
      return new Promise((resolve, reject) => {
        INSTANCE({
          method: "GET",
          url: "/candidate/" + id,
        })
          .then(resolve)
          .catch(reject);
      });
    };
  

    
  }



  
  



  