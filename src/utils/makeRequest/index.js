import { ERROR_ROUTE } from '../../constants/routes';
import { BACKEND_URL } from '../../constants/apiEndpoints';
import axios from 'axios';

const makeRequest = async (
  apiEndPoint = { url: ' ', method: ' ' },
  dynamicContent = {},
  navigate,
  baseURL,
) => {
  try {
    const requestBody =
      baseURL !== BACKEND_URL
        ? {
            baseURL: baseURL,
            url: apiEndPoint.url,
            method: apiEndPoint.method,
            ...dynamicContent,
          }
        : {
            baseURL: baseURL,
            url: apiEndPoint.url,
            method: apiEndPoint.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            ...dynamicContent,
          };
    const { data } = await axios(requestBody);
    return data;
  } catch (e) {
    if (navigate) {
      const errorStatus = e.error;
      if (baseURL === BACKEND_URL && localStorage.getItem('token') === null) {
        navigate('/login');
      } else if (errorStatus) {
        navigate(`${ERROR_ROUTE}/${errorStatus}`);
      } else {
        navigate(ERROR_ROUTE);
      }
    }
  }
};
export default makeRequest;
