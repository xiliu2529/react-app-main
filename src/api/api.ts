

const data = {
  service_name: "qww",
  mode: "GET",
  types: "volumecurve_info"
};

const BASE_URL = 'http://11.255.97.33/home/member/';

export const fetchAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}qww_dev/prod/userdata/load`, {
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

export const fetchAPI1 = async (data1: any) => {
  try {
    const response = await fetch(`${BASE_URL}qww_dev/prod/userdata/load`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_name: "qww",
        mode: "PUT",
        types: "volumecurve_info",
        put_json_data: data1
      })
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

// c