import axios from "axios";
import _ from "lodash";
import {
  redirect,
  setMessage,
  startLoading,
  stopLoading,
} from "../store/actions/shared";
import { message } from "./common";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

// const navigate = useNavigate();
export const interceptor = (store) => {
  AxiosInstance.interceptors.request.use(
    (conf) => {
      store.dispatch(startLoading());
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
      store.dispatch(stopLoading());
      return Promise.resolve(next);
    },
    (error) => {
      const text =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      store.dispatch(stopLoading());
      switch (_.get(error, "response.status")) {
        case 403:
          localStorage.removeItem("user");
          store.dispatch(setMessage(text, "error"));
          break;
        case 404:
        case 500:
          store.dispatch(setMessage(text, "error"));
          store.dispatch(redirect(`${_.get(error, "response.status")}`));
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
};
export default AxiosInstance;
