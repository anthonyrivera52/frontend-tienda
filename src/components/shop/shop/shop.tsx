import React from "react";
import Card from "../../cards/card";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Manzana",
    price: 10.99,
    quantity: 5,
    image:
      "https://media.istockphoto.com/id/184276818/es/foto/manzana-red.webp?s=612x612&w=is&k=20&c=jLkUn_RXJu3eynXDw5l_7djksSINBBtbhLEbq3ArH0A=",
  },
  {
    id: 2,
    name: "Pera",
    price: 12.99,
    quantity: 5,
    image:
      "https://media.istockphoto.com/id/164142758/es/foto/pera-%C3%BAnica.webp?s=612x612&w=is&k=20&c=E18cHMRQP_ouAkgSJ_plHRAPdLfpg_w-fx2nKWGoUP0=",
  },
];

const Shop: React.FC = () => {
  return (
    <>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <></>
            // <div
            //   key={product.id}
            //   style={{
            //     border: "1px solid #ccc",
            //     borderRadius: "8px",
            //     padding: "16px",
            //     width: "200px",
            //     textAlign: "center",
            //   }}
            // >
            //   <img
            //     src={product.image}
            //     alt={product.name}
            //     style={{ width: "100%", height: "150px", objectFit: "cover" }}
            //   />
            //   <h3>{product.name}</h3>
            //   <p>Precio: ${product.price.toFixed(2)}</p>
            //   <p>Cantidad: {product.quantity}</p>
            // </div>
          ))}
        </div>

        <div className="w-60 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="w-full h-40 object-cover rounded-t-lg"
              src={products[0].image}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                {products[0].name}
              </h5>
            </a>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {products[0].price.toFixed(2)}
              </span>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
        <br />
        <div className="w-60 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="w-full h-40 object-cover rounded-t-lg"
              src={products[1].image}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                {products[1].name}
              </h5>
            </a>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {products[1].price.toFixed(2)}
              </span>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Shop;
