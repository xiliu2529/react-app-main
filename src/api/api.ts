import axios from 'axios';

const POSTS_API_URL = 'api/logout/bye.html';

// export const fetchData = async (): Promise<[]> => {
//   try {
//     const response = await axios.get<[]>(POSTS_API_URL);
//     return response.data; 
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
const a = {service_name: "qww", mode: "GET", types: "volumecurve_info"}

export const postData1 =  async (): Promise<any> => { 
  try {
    const response = await fetch('/api/qww_dev/prod/userdata/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic UUlLQTExMTU4OlFJS0ExMTE1OA=='
      },
      body: JSON.stringify(a),
    });

  
    if (!response.ok) {
      const errorText = await response.text(); 
      console.error('Error response text:', errorText);
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Data posted:', result);
    return result;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const postData = async (): Promise<[]> => {
  try {
    const response = await axios.post<[]>(POSTS_API_URL, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': 'Basic UUlLQTExMTU4OlFJS0ExMTE1OA=='
      }
    });
    // console.log('Server response:', response);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};