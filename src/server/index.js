import { fetchData, fetchToken } from '../utils/fetch';

// server
const login = params => fetchData('/api/v1/login', params, 'POST');
const getUserInfo = params => fetchToken('/api/v1/user', params, 'GET');
const getList = params => fetchData('/api/v1/list', params, 'GET');

export {
  login,
  getList,
  getUserInfo
};