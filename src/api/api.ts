import axios from 'axios';


const apiClient = axios.create({
  // baseURL: '/api/qww_dev/prod/',
  headers: {
    'Content-Type': 'application/json',
    'dataType':'json',
  },
  withCredentials: true
});

export const postData1 = async (): Promise<any> => {
  try {
    const response = await apiClient.post('api/qrlab/volumeCurve/api/package.do');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const data = {
  service_name: "qww",
  mode: "GET",
  types: "volumecurve_info"
};

export const fetchAPI = async () => {
  
  try {
    const response = await fetch('http://11.255.97.33/home/member/qww_dev/prod/userdata/load', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); 
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
// const apiClient1 = axios.create({
//   baseURL: '/api2',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true
  
// });

// export const postData2 = async (): Promise<any> => {
//   try {
//     const response = await apiClient1.post('/qww_dev/prod/analyze/request');
//     return response.data;
//   } catch (error) {
//     console.error('Error posting data:', error);
//     throw error;
//   }
// };

