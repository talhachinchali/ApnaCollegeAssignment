import api from "../lib/api";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
