import { AUTH_URL } from '../../constants/apiEndpoints';
import { ERROR_ROUTE } from '../../constants/routes';
import axios from 'axios';

const makeRequest = async (
  apiEndPoint = { url: ' ', method: ' ' },
  dynamicContent = {},
  navigate,
) => {
  try {
    const requestBody = {
      baseURL: AUTH_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicContent,
    };
    const { data } = await axios(requestBody);
    return data;
  } catch (e) {
    if (navigate) {
      const errorStatus = e.error;
      if (errorStatus) {
        navigate(`${ERROR_ROUTE}/${errorStatus}`);
      } else {
        navigate(ERROR_ROUTE);
      }
    }
  }
};
export default makeRequest;
