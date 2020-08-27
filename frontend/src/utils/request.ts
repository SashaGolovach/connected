import axios, { AxiosResponse, AxiosInstance } from 'axios';

type endpoints =
  | 'auth/token'
  | 'auth/spotify'
  | 'users'
  | 'users/me'
  | 'match'
  | string;

type methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IMakeRequestArgs {
  method: methods;
  url: endpoints;
  axiosInstance: AxiosInstance;
  params: object;
}

const apiUrl = 'https://d7c4eb936197.ngrok.io/';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const initAxiosAuthHeader = (accessToken: string) => {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;
};

const getResponse: (
  args: IMakeRequestArgs
) => Promise<AxiosResponse> = async args => {
  let response: AxiosResponse;
  const { method, url, axiosInstance, params } = args;
  console.log(axiosInstance.defaults.headers);
  switch (method) {
    case 'GET':
      response = await axiosInstance({ url, params });
      break;
    case 'POST':
    case 'PUT':
    case 'PATCH':
      response = await axiosInstance({ url, method, data: params });
      break;
    case 'DELETE':
      response = await axiosInstance({ url, params, method });
      break;
  }
  return response;
};

const makeRequest = (args: IMakeRequestArgs): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await getResponse(args);

      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const send = (
  method: methods,
  url: endpoints,
  params?: object
): Promise<any> => makeRequest({ method, url, axiosInstance, params });
