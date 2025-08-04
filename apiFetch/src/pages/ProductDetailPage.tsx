import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductDetailPage() {
  const { id } = useParams(); // get product id from route
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get<Product>(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-green-600 text-xl font-bold mb-2">${product.price}</p>
      <p className="text-gray-500">{product.category}</p>
    </div>
  );
}
