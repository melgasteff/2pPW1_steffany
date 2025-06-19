import { useEffect, useState } from "react"
import api from "../libs/api"
interface ItemInterface {
    id: number
    name: string
    price: number
}
const Jonas = () => {
    const [productList, setProductList] = useState<ItemInterface[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            api.get("/products").then((response) => {
                console.log(response.data);
                setProductList(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }

        fetchProducts();
    }, []);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Jonas</h1>
            {productList.length === 0 ? (
                <p>No hay productos</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {productList.map((food) => (
                        <div key={food.id} className="bg-white rounded shadow p-4">
                            <h2 className="font-semibold">{food.name}</h2>
                            <p className="text-gray-600">${food.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Jonas
