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
            address: formData.address,
            addressCoordinates: formData.addressCoordinates || null
          };
          break;

        case 'restaurant':
          endpoint = '/restaurantSignup';
          body = {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            location: formData.location,
            locationCoordinates: formData.locationCoordinates || null
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      return {
        success: true,
        data,
        user: {
          id: data?.data?._id || null,
          name: formData.fullName,
          email: formData.email,
          mob: formData.mobile || '',
          dob: formData.dob || null,
          address: formData.address || '',
          addressCoordinates: formData.addressCoordinates || data?.data?.addressCoordinates || null,
          location: formData.location || '',
          locationCoordinates: formData.locationCoordinates || data?.data?.locationCoordinates || null,
          role,
        },
      };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  login: async (email, password, role) => {
    try {
      let endpoint;

      switch (role) {
        case 'customer': endpoint = '/login'; break;
        case 'restaurant': endpoint = '/restaurantLogin'; break;
        case 'agent': endpoint = '/agentLogin'; break;
        default: throw new Error('Invalid role');
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      return {
        success: true,
        data,
        user: {
          id: data.data._id,
          name: data.data.name || data.data.email,
          email: data.data.email || email,
          mob: data.data.mob || data.data.phone || '',          dob: data.data.dob || null,          address: data.data.address || '',
          addressCoordinates: data.data.addressCoordinates || null,
          location: data.data.location || '',
          locationCoordinates: data.data.locationCoordinates || null,
          role
        },
      };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;

      const parsed = JSON.parse(user);
      return { ...parsed, id: parsed.id || parsed._id || null };
    } catch {
      return null;
    }
  },

  saveUser: (user) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        id: user.id || user._id || null,
      })
    );
  },

  updateUser: async (userId, payload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getRestaurants: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurants`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch restaurants');
      return { success: true, data: data.data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getRestaurantById: async (restaurantId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch restaurant');
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // ===================== ORDERS =====================

  getRestaurantOrders: async (restaurantId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurant/orders/${restaurantId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateRestaurantOrderStatus: async (orderId, restaurantId, action) => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurant/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, action }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getRestaurantProfile: async (restaurantId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateRestaurantLocation: async (restaurantId, locationPayload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/location`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationPayload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getRestaurantMenu: async (restaurantId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurant/${restaurantId}/menu`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  placeOrder: async (orderPayload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getUserOrders: async (userId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/orders/${userId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAvailableAgentOrders: async (agentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/agent/orders/available/${agentId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAgentActiveOrders: async (agentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/agent/orders/active/${agentId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateAgentOrderDecision: async (orderId, agentId, action) => {
    try {
      const res = await fetch(`${API_BASE_URL}/agent/orders/${orderId}/decision`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateAgentOrderStatus: async (orderId, agentId, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/agent/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // ===================== MENU =====================

  addMenuItem: async (menuData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/addMenu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteMenuItem: async (itemId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/menu/${itemId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateMenuItem: async (itemId, updatedData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/menu/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, data: data.data };

    } catch (error) {
      return { success: false, error: error.message };
    }
  },

};

export default authService;
