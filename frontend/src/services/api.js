const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Auth Service
export const authService = {
  signup: async (name, email, password, role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role, // Add role support
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return {
        success: true,
        data,
        user: { name, email, role },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  login: async (email, password, role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role, // Add role support
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return {
        success: true,
        data,
        user: { name: data.data.name, email, role },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  logout: () => {
    // Clear any stored auth tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  saveUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};

export default authService;
