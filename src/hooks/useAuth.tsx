import axios from "axios";
import { User } from "../interface/user";

// Custom hook for authentication
const useAuth = () => {
    
  // Register user
  const registerUser = async (user: Partial<User>, password: string) => {
    try {
      const response = await axios.post("/api/auth/register", {
        ...user,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  // Login user
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      return response.data.token;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const getUser = async (token: string) => {
    try {
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Add "Bearer" before the token
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting user information:", error);
      throw error;
    }
  };
  

  return {
    registerUser,
    loginUser,
    getUser,
  };
};

export default useAuth;
