import api from "./index";

export const getPolicyPages = async () => {
  try {
    const response = await api.get("/policy-pages");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePolicyPage = async (slug: string, content: string) => {
  try {
    const response = await api.put(`/policy-pages/${slug}`, { content });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBusinessSettings = async () => {
  try {
    const response = await api.get("/settings/business");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBusinessSettings = async (settings: any) => {
  try {
    const response = await api.put("/settings/business", settings);
    return response.data;
  } catch (error) {
    throw error;
  }
};
