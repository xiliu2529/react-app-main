

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
