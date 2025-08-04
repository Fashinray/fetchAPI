import api from "../api/axios";

interface Product {
  id?: number; // id is optional for POST
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (newProduct: Product) => {
  try {
    const response = await api.post("/products", newProduct);
    console.log("Product created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
