import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Bienvenido al Dashboard
                </h1>
                <div className="space-y-4">
                    <Link
                        to="/jonas"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Ver Productos
                    </Link>
                    <Link
                        to="/ventas"
                        className="block w-full bg-green-600 text-white text-center py-3 rounded-md hover:bg-green-700 transition duration-200"
                    >
                        Ir a Casamiento Koygua
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
  