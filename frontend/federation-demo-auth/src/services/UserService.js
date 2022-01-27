import axios from 'axios';
import authHeader from './AuthHeader';

class UserService {

API_URL = "http://localhost:3000";

  getPublicHi() {
    return axios.get(API_URL + 'hi');
  }

  getUserBoard() {
    return axios.get(API_URL + 'hello', { headers: authHeader() });
  }

}

export default new UserService();