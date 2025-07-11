import { CiApple } from "react-icons/ci";
import { GiSteak } from "react-icons/gi";
import { PiCoffeeThin, PiDogThin, PiHandSoapThin, PiBeerBottleThin  } from "react-icons/pi";
import { LuMilk } from "react-icons/lu";
const SideBar = () => {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xs font-bold text-gray-800">MAIN</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <CiApple  className="w-5 h-5 text-gray-500 mr-3" />
              Frutas y Verduras
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <GiSteak  className="w-5 h-5 text-gray-500 mr-3" />
              Carne y pescado
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <PiCoffeeThin   className="w-5 h-5 text-gray-500 mr-3" />
              Aperitivos
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <PiDogThin   className="w-5 h-5 text-gray-500 mr-3" />
              Mascotas
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LuMilk   className="w-5 h-5 text-gray-500 mr-3" />
              Lacteos
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <PiHandSoapThin   className="w-5 h-5 text-gray-500 mr-3" />
              Hogar y limpieza
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <PiBeerBottleThin   className="w-5 h-5 text-gray-500 mr-3" />
              Bebidas
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
