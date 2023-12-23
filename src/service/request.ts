import axios from "axios";
import qs from 'qs'
import type {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { baseURL, timeout } from "./config";
import router from "@/router";
import pinia from "@/store";
import { user } from "@/store/user";
import { showToast } from "vant";
const { token, info: _info } = storeToRefs(user(pinia))

const config = {
  baseURL,
  timeout,
};

const urlsFormdata = ['/bank/common/auth/face-temp']

class Request {
  service;
  constructor(config: CreateAxiosDefaults<any>) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        return {
          ...config,
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": urlsFormdata.includes(config.url as string) ? 'multipart/form-data' : 'application/json'
          },
        } as InternalAxiosRequestConfig;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    this.service.interceptors.response.use(
      (config: AxiosResponse<any, any>) => {
        const { code, message, data, ...res } = config.data
        if (code === 0 || code === 200) {
          if (data) {
            return data
          } else {
            return res
          }
        } else {
          showToast(message)
          return Promise.reject(new Error(message))
        }
      },
      (error: any) => {
        Promise.reject(error);
      }
    );
  }

  get(url: string, params?: object): any {
    return this.service.get(url, {
      params, paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    });
  }

  post(url: string, params?: object): any {
    return this.service.post(url, params);
  }

  put(url: string, params?: object): any {
    return this.service.put(url, params);
  }

  delete(url: string, params?: object): any {
    return this.service.delete(url, { params });
  }

  other(method: string, url: string, data?: any, params?: any) {
    return this.service({
      method,
      url,
      data,
      params
    })
  }
}

export default new Request(config);
