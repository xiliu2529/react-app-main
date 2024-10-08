

export const serverMessageAPI = async () => {
  try {
    const response = await fetch(`../common/conf/serverMessage.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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
export const clientMessageAPI = async () => {
  try {
    const response = await fetch(`../common/conf/clientMessage.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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

export const packageAPI = async () => {
  try {
    const response = await fetch(`../../auth/check/package`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const resNoACL = response.headers.get('x-auth-status-noacl');
    let noaclFlag = false;
    if (typeof resNoACL === 'string') {
      noaclFlag = resNoACL === "true" ? true : false
    } else {
      noaclFlag = resNoACL??false
    }
    const result = await response.json();
    return { noaclFlag, result };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const loadSettingsAPI = async () => {
  try {
    const response = await fetch(`../../userdata/load?service_name=qww&mode=GET&types=volumecurve_info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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

export const saveSettingsAPI = async (data: any) => {
  try {
    const response = await fetch(`../../../prod/userdata/store`, {
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
 const response = await fetch(`../../analyze/request?type=volumecurve`, {
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
      const response = await fetch(`../../analyze/status?${queryParams}`, {
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
        const response = await fetch(`../../results/volumecurve/json/${ID}/${Qv}`, {
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







