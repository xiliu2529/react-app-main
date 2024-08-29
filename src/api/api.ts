import axios from 'axios';

// const a = { service_name: "qww", mode: "GET", types: "volumecurve_info" };

const username = 'QIKA11158';
const password = 'QIKA11158';

const generateAuthorizationToken = (username: String, password: String) => {
  const credentials = `${username}:${password}`;
  return 'Basic ' + btoa(credentials);
};

const apiClient = axios.create({
  // baseURL: '/api/qww_dev/prod/',
  headers: {
    'Content-Type': 'application/json',
    //  'Authorization': 'Basic UUlLQTExMTU4OlFJS0ExMTE1OA=='
    'Authorization': generateAuthorizationToken(username, password),
    'dataType':'json',
  },
  withCredentials: true
});

export const postData1 = async (): Promise<any> => {
  try {
    const response = await apiClient.post('api/qrlab/volumeCurve/api/package.do');
    // console.log('Data posted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

const apiClient1 = axios.create({
  baseURL: '/api2',
  headers: {
    'Content-Type': 'application/json',
    //  'Authorization': 'Basic UUlLQTExMTU4OlFJS0ExMTE1OA=='
    'Authorization': generateAuthorizationToken(username, password),
  },
  withCredentials: true
  
});

export const postData2 = async (): Promise<any> => {
  try {
    const response = await apiClient1.post('/qww_dev/prod/analyze/request');
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

