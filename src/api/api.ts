import axios from 'axios';

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = async (): Promise<[]> => {
  try {
    const response = await axios.get<[]>(POSTS_API_URL);
    return response.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// 定义发送 POST 请求的函数
export const postData = async (data: object): Promise<[]> => {
  try {
    const response = await axios.post<[]>(POSTS_API_URL, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Server response:', response);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};