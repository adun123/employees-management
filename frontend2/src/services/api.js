import axios from "axios";

const API = "http://localhost:4000/api";


export const getEmployees = async () => {
  const res = await axios.get(`${API}/employees`);
  return res.data;
};

export const createEmployee = async (data) => {
  const res = await axios.post(`${API}/employees`, data);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const res = await axios.put(`${API}/employees/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await axios.delete(`${API}/employees/${id}`);
  return res.data;
};
