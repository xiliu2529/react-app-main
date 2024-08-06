// src/services/api.ts
import axios from 'axios';

// 定义 API 的 URL
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';



// 定义从 API 获取数据的函数
export const fetchData = async (): Promise<[]> => {
  try {
    const response = await axios.get<[]>(POSTS_API_URL);
    return response.data; // 返回文章数据
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
