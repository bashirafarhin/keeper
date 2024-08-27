import axios from "axios";
const config={headers: {'Content-Type': 'application/json'}, withCredentials: true};

export const checkAuth = async () => {
  return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/check`,config);
};

export const getAllNotes= async(id) => {
    try {
      return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/${id}`,config);
    } catch (error) {
      console.error(error);
    }
}

export  const addNote= async(note, id) =>  {
    try {
      return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notes/${id}`,note,config);
    } catch (error) {
      console.error(error);
    }
}

export const UserLogin = async (data) => {
      try {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, data, config);
      } catch (error) {
        console.log(error);
      }
};

export const authUsingGoogle = async (email) => {
      try {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`,{email}, config);
      } catch (error) {
        console.log(error);
      } 
};

export const UserRegistration= async(register) => {
      try{
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,register,config);
      } catch(error) {
        console.log(error);
      }
}

export const deleteNote = async(index,id) => {
  try {
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/notes/${id}/${index}`,config);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateNote = async(data,id) => {
  try {
    return axios.put(`${import.meta.env.VITE_BACKEND_URL}/notes/${id}`,data, config);
  } catch (error) {
    console.log(error);
  }
}

export const changeBackgroundImage = async(index,id) => {
  try{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notes/background/${id}`,{index},config);
  } catch(error) {
    console.log(error);
  }
};

export const userLogout = async() => {
  try {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`,config);
  } catch(error) {
    console.log(error);
  }
}

export const userAccountDelete = async(id) => {
  try{
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteAccount/${id}`,config);
  } catch(error) {
    console.log(error);
  }
}