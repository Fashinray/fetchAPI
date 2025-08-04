import { useEffect, useState } from "react";
import api from "../api/axios";
import { createProduct } from "../services/productService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import type { RootState } from "../Redux/store";
import { useAuth } from "../context/AuthContext";

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchId, setSearchId] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const { logout } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const newProduct: Product = {
      title: "New Product",
      price: 12.99,
      description: "This is a new product added via Axios POST",
      category: "electronics",
      image: "https://via.placeholder.com/300x400",
    };

    try {
      const created = await createProduct(newProduct);
      setProducts(prev => [...prev, created]);
    } catch (error) {
      console.error("Failed to create product");
    }
  };

  const handleSearchProduct = async () => {
    if (!searchId) {
      alert("Please enter a Product ID");
      return;
    }

    try {
      const response = await api.get<Product>(`/products/${searchId}`);
      setProducts([response.data]);
    } catch (error) {
      console.error("Product not found:", error);
      alert("Product not found");
    }
  };

  // ✅ Prevent duplicate products in cart
  const handleAddToCart = (product: Product) => {
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (!isAlreadyInCart) {
      dispatch(addToCart(product));
    } else {
      alert("This product is already in your cart.");
    }
  };

  // ✅ Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 justify-between">
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 hover:bg-red-500"
        >
          Add New Product
        </button>

        <div className="flex space-x-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Product ID"
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleSearchProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Search Product
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Products Section */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition duration-200 flex flex-col"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-600 text-sm flex-grow">{product.description}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm mt-2 hover:bg-red-500"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="bg-gray-100 rounded p-4 relative">
          <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>

          {/* Cart Item Count Badge */}
          <div className="absolute top-2 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {cart.length}
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded shadow p-2 text-sm">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              ))}

              {/* ✅ Display total price */}
              <div className="mt-4 text-right font-bold text-lg">
                Total: ${totalPrice.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
