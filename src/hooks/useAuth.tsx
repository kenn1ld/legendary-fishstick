import axios, { AxiosResponse } from 'axios';

import { User } from '../interface/user';
import { useCallback } from 'react';
interface RegisterResponse {
  message: string;
}

interface LoginResponse {
  token: string;
}

type GetUserResponse = User;

// Custom hook for authentication

const useAuth = () => {

    const registerUser = async (user: Partial<User>, password: string) => {
  console.log('user:', user, 'password:', password)
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      '/api/auth/register',
      {
        ...user,
        password,
      }
    );
    return response.data.message;
  } catch (error: unknown) { // Define error as any
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof error.response === 'object' &&
      error.response !== null &&
      'data' in error.response &&
      typeof error.response.data === 'object' &&
      error.response.data !== null &&
      'errors' in error.response.data &&
      Array.isArray(error.response.data.errors)
    ) {
      const axiosError = error as any; // We've done enough checks to assert that this is an axios error
      axiosError.response.data.errors.forEach((err: any) => console.error(`${err.param}: ${err.msg}`));
    }
    throw error;
  }
};




  // Login user

  const loginUser = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        '/api/auth/login',
        {
          email,

          password,
        }
      );

      console.log('response:', response);

      return response.data.token;
    } catch (error) {
      console.error('Error logging in user:', error);

      throw error;
    }
  };

  const getUser = useCallback(async (token: string) => {
  try {
    const response: AxiosResponse<GetUserResponse> = await axios.get(
      '/api/auth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting user information:', error);
    throw error;
  }
}, []);


  return {
    registerUser,
    loginUser,
    getUser,
  };
};

export default useAuth;
