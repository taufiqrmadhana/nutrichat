const API_URL = "http://192.168.137.135:8000/chat"

export const sendMessageToAPI = async (email: string, message: string): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/?email=${email}&message=${message}`);
      const data = await response.json();
      
      if (data && data.response) {
        return data.response;
      } else {
        throw new Error('No response received from the server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  