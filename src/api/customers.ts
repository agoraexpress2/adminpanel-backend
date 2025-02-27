import api from "./index";

export const getCustomers = async () => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerById = async (id: number) => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCustomer = async (customerData: any) => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (id: number, customerData: any) => {
  try {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleCustomerStatus = async (id: number, isActive: boolean) => {
  try {
    const response = await api.patch(`/customers/${id}/status`, { isActive });
    return response.data;
  } catch (error) {
    throw error;
  }
};
