import axios from 'axios';
import dotenv from 'dotenv';

if (dotenv.config({ path: '.env' }).error) {
  console.warn('No .env file found, configuration will be ignored.');
}

class ApiClient {
  constructor() {
    this.baseURL = `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3`;
    this.accessToken = process.env.ACCESS_TOKEN;
  }

  getHeaders() {
    return {
      'X-Auth-Token': this.accessToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  handleApiError(error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the API');
    } else {
      console.error('Error:', error.message);
      throw error;
    }
  }

  async getStoreProfile() {
    try {
      const response = await axios.get(`${this.baseURL}/settings/store/profile`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async updateStoreProfile(profileData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/store/profile`, profileData, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getStoreLocale() {
    try {
      const response = await axios.get(`${this.baseURL}/settings/store/locale`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async updateStoreLocale(localeData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/store/locale`, localeData, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }
}

export default ApiClient;