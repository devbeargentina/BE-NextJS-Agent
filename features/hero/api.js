import axios from "axios";
// const devEnv = process.env.NODE_ENV !== "production";

// const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//   baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });

const createAPI = (baseURL) => {
  
  const instance = axios.create({ baseURL });
  const defaultApiKey = '6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN';

  instance.interceptors.request.use((req) => {
    if (localStorage.getItem('userToken')) {
      req.headers.Authorization = `Bearer ${localStorage.getItem('userToken')}`;
    }
    // if (!req.headers['X-Api-Key']) {
    //   req.headers['X-Api-Key'] = defaultApiKey;
    // }
    return req;
  });

  return instance;
};

export default createAPI;
/* Old working code
const API = axios.create({ baseURL: `https://localhost:7002` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
  }
  return req;
});
*/
// export const signIn = (formData) => API.post("/users/signin", formData);
// export const signUp = (formData) => API.post("/users/signup", formData);

// export const createTour = (tourData) => API.post("/tour", tourData);

// export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
// export const updateTour = (updatedTourData, id) =>
//   API.patch(`/tour/${id}`, updatedTourData);
// export const deleteTour = (id) => API.delete(`/tour/${id}`);
//export default API;
