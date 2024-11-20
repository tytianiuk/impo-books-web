import api from '@/lib/api';
import { User } from '@/types/user';

class AuthAPI {
  async register(email: string, fullName: string, password: string) {
    return await api.post('/users/register', {
      body: { email, password, fullName },
      withCredentials: true,
    });
  }

  async login(email: string, password: string) {
    return await api.post('/users/login', {
      body: { email, password },
      withCredentials: true,
    });
  }

  async getMe() {
    return await api.get<User>('/users/me', {
      withCredentials: true,
    });
  }
}

export default new AuthAPI();
