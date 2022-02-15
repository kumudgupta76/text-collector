
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const interceptor = (store) => {
  AxiosInstance.interceptors.request.use(
    (conf) => {
      // you can add some information before send it.
      // conf.headers['Auth'] = 'some token'
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  AxiosInstance.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      // You can handle error here and trigger warning message without get in the code inside
      store.dispatch({
        type: "ERROR_MESSAGE",
        message: error.message,
      });
      return Promise.reject(error);
    }
  );
};
export default AxiosInstance;