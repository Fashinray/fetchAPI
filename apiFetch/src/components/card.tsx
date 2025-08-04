interface ProductCardProps {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductCard({ title, price, description, image }: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">{description.substring(0, 100)}...</p>
        <div className="text-blue-600 font-semibold text-lg">${price}</div>
      </div>
    </div>
  );
}
