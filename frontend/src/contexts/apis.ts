import axios from "axios";
import { toast } from 'react-toastify';

export const getAuthorizationToken = (token: any) => {
    axiosInstance.defaults.headers['Authorization'] = token
}

export const axiosInstance: any = axios.create({
    // baseURL: `${process.env.REACT_APP_BASE_URL}/`,
    baseURL: `http://localhost:5000/`,
    headers: {
        "Accept": "application/json"
    },
});

const showError = (error: any) => {
    console.log('error ', error)
    if (error?.response?.data?.message) {
        return toast.error(error.response.data.message);
    } else if (error?.request?.statusText) {
        return toast.error(error?.request?.statusText);
    } else {
        return toast.error(error?.message);
    }
};

const apis = {
    login: async (body: any) => {
        return axiosInstance
            .post("login", body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status === 200 || response?.status === 201 || response?.status === 202) {
                    axiosInstance.defaults.headers['Authorization'] = response?.data?.token
                    return response?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
    logout: async () => {
        return axiosInstance.defaults.headers['Authorization'] = null
    },
    getDataApi: async (url: any, query: any, token: any) => {
        getAuthorizationToken(token)
        let URL = url + "?"
        for (let key in query) {
            URL += `${key}=${query[key]}&`
        }
        return axiosInstance
            .get(URL, query, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
    getSingleDataApi: async (url: any, query: any, token: any) => {
        getAuthorizationToken(token)
        const URL = `${url}/${query.id}`
        return axiosInstance
            .get(URL, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
    addDataApi: async (url: any, body: any, token: any) => {
        getAuthorizationToken(token)
        return axiosInstance
            .post(url, body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
    editDataApi: async (url: any, body: any, token: any) => {
        getAuthorizationToken(token)
        const URL = `${url}/${body.id}`
        delete body.id
        delete body.edit
        return axiosInstance
            .patch(URL, body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
    deleteDataApi: async (url: any, body: any, token: any) => {
        getAuthorizationToken(token)
        return axiosInstance
            .delete(`${url}/${body._id}`, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
    fileUploadApi: async (url: any, file: any, token: any) => {
        getAuthorizationToken(token)
        let formData = new FormData();
        formData.append("file", file);
        return axiosInstance
            .post(url, formData, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
            });
    },
};

export default apis;