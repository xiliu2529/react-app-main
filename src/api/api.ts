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
    const response = await fetch('./api/qww_dev/prod/userdata/load', {
      method: 'POST', // 确保与 API 规范一致
      headers: {
        'Content-Type': 'application/json', // 指定内容类型为 JSON
      },
      body: JSON.stringify(data) // 将数据转换为 JSON 字符串
    });

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 检查响应内容类型是否为 JSON
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json(); // 解析 JSON 数据
      return result;
    } else {
      const text = await response.text(); // 如果响应不是 JSON，获取文本内容
      console.error('Unexpected response format:', text);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Fetch error:', error); // 记录错误
    throw error; // 重新抛出错误，供调用者处理
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

