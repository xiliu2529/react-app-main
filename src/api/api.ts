

const data = {
  service_name: "qww",
  mode: "GET",
  types: "volumecurve_info"
};

const BASE_URL = 'http://11.255.97.33/home/member/';

export const packageAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}qww_dev/prod/auth/check/package`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const noaclFlag = response.headers.get('x-auth-status-noacl') === 'true';
    // const noaclFlag = response.headers.get('X-Amzn-Trace-Id');
    const result = await response.json();
    return { noaclFlag, result };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

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

export const loadSettingsAPI = async (data: any) => {
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
        put_json_data: data
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

export const requestAPI = async (data: any) => {
  try {
    // http://11.255.97.33/home/member/qwp_dev/dev/analyze/request
    // const response = await fetch(`../../analyze/request`, {
    const response = await fetch(`http://11.255.97.33/home/member/qwp_dev/prod/analyze/request?type=volumecurve`, {
 // const response = await fetch(`http://11.255.97.33/home/member/qww_dev/dev/analyze/request?type=volumecurve`, {
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
    const response = await fetch(`http://11.255.97.33/home/member/qwp_dev/prod/analyze/status?${queryParams}`, {
      // const response = await fetch(`http://11.255.97.33/home/member/qww_dev/dev/analyze/status?${queryParams}`, {
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
export const getQvDataAPI = async (ID: any,Qv:any) => {
  try {
    // const queryParams = new URLSearchParams({
    //   RequestID: ID
    // }).toString();
      const response = await fetch(`http://11.255.97.33/home/member/qww_dev/dev/results/volumeCurve/json/${ID}/${Qv}`, {
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







