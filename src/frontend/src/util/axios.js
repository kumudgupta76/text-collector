
import axios from 'axios';
import { SET_MESSAGE, START_LOADING, STOP_LOADING } from '../store/actions/types';
import { message } from './common';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const interceptor = (store) => {
    AxiosInstance.interceptors.request.use(
        (conf) => {
            store.dispatch({
                type: START_LOADING
            })
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
            store.dispatch({
                type: STOP_LOADING
            })
            return Promise.resolve(next);
        },
        (error) => {

            const text =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            message({ type: 'error', title: 'Error', description: text });

            store.dispatch({
                type: STOP_LOADING
            })
            return Promise.reject(error);
        }
    );
};
export default AxiosInstance;