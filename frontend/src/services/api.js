const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Auth Service
export const authService = {
  signup: async (formData, role) => {
    try {
      let endpoint, body;

      switch (role) {
        case 'customer':
          endpoint = '/reg';
          body = {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            mob: formData.mobile,
            dob: formData.dob,
            address: formData.address
          };
          break;
        case 'restaurant':
          endpoint = '/restaurantSignup';
          body = {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            location: formData.location
          };
          break;
        case 'agent':
          endpoint = '/agentCreate';
          body = {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.mobile,
            vehicleNo: formData.vehicleNo
          };
          break;
        default:
          throw new Error('Invalid role');
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return {
        success: true,
        data,
        user: {
          id: data?.data?._id || null,
          name: formData.fullName,
          email: formData.email,
          role,
        },
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
      let endpoint;

      switch (role) {
        case 'customer':
          endpoint = '/login';
          break;
        case 'restaurant':
          endpoint = '/restaurantLogin';
          break;
        case 'agent':
          endpoint = '/agentLogin';
          break;
        default:
          throw new Error('Invalid role');
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return {
        success: true,
        data,
        user: { 
          id: data.data._id,
          name: data.data.name || data.data.email, 
          email, 
          role 
        },
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

  getRestaurantOrders: async (restaurantId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurant/orders/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      return {
        success: true,
        data: data.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export default authService;
