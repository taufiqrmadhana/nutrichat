import axios from 'axios';

const BASE_URL = 'http://192.168.137.135:8000/auth'; // replace with your backend IP and port

interface AuthRequest {
  email: string;
  password: string;
}

interface InitializationRequest {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  country: string;
  weight: number;
  height: number;
  food_allergies: string;
  daily_exercises: string;
  daily_activities: string;
  medical_record: string;
  weight_goal: number;
  general_goal: string;
}

export const registerUser = async (auth: AuthRequest) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, auth);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || 'Registration failed.');
  }
};

export const loginUser = async (auth: AuthRequest) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, auth);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || 'Login failed.');
  }
};

export const initializeUser = async (data: InitializationRequest) => {
  try {
    const res = await axios.post(`${BASE_URL}/initialize`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || 'Initialization failed.');
  }
};
