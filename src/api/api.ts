// // src/services/api.ts
// import axios from 'axios';

// // 定义 API 的 URL
// const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// // 定义文章数据类型
// export interface PostType {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// // 定义从 API 获取数据的函数
// export const fetchData = async (): Promise<PostType[]> => {
//   try {
//     const response = await axios.get<PostType[]>(POSTS_API_URL);
//     return response.data; // 返回文章数据
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
