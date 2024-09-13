

const data = {
  service_name: "qww",
  mode: "GET",
  types: "volumecurve_info"
};

const BASE_URL = 'http://11.255.97.33/home/member/';

export const saveSettingsAPI = async () => {
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

export const loadSettingsAPI = async (data1: any) => {
  try {
    const response = await fetch(`${BASE_URL}qww_dev/prod/userdata/store`, {
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
// export const fetchAPI2 = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}qwp_dev/prod/auth/check/package`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// };

export const requestAPI = async (data: any) => {
  try {
    // http://11.255.97.33/home/member/qwp_dev/dev/analyze/request
    // const response = await fetch(`../../analyze/request`, {
    //const response = await fetch(`http://11.255.97.33/home/member/qwp_dev/prod/analyze/request`, {
    const response = await fetch(`http://11.255.97.33/home/member/qww_dev/dev/analyze/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'dataType':'json',
        'cache':'false'
      },
      body:JSON.stringify(data)
      
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

export const statusAPI = async (data: any) => {
  try {
    const queryParams = new URLSearchParams({
      RequestID: data
    }).toString();
    // const response = await fetch(`http://11.255.97.33/home/member/qwp_dev/prod/analyze/status`, {
      const response = await fetch(`http://11.255.97.33/home/member/qww_dev/dev/analyze/status?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'dataType':'json'
      },
      
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







