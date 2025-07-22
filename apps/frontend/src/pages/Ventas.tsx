import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PagosInterface {
    id?: number;
    description: string;
    id_casamiento: number;
    monto: string;
    date: string;
}

const Ventas = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Casamiento Koygua
                </h2>
                <Pagos />
            </div>
        </div>
    );
};

const Pagos = () => {
    const navigate = useNavigate();
    const [pagos, setPagos] = useState<PagosInterface[]>([]);
    const [editando, setEditando] = useState<number | null>(null);
    const [formData, setFormData] = useState<Omit<PagosInterface, "id">>({
        description: "",
        id_casamiento: 0,
        monto: "",
        date: "",
    });

    useEffect(() => {
        fetchPagos();
    }, []);

    const fetchPagos = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/ventas");
            const data = await res.json();
            setPagos(data);
        } catch (error) {
            console.error("Error al obtener pagos:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (pago: PagosInterface) => {
        setEditando(pago.id ?? null);
        setFormData({
            description: pago.description,
            id_casamiento: pago.id_casamiento,
            monto: pago.monto,
            date: pago.date || "",
        });
    };

    const handleSave = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/api/ventas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            await fetchPagos();
            setEditando(null);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que querés eliminar esta venta? Se eliminará también el casamiento asociado."
        );
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:3000/api/ventas/${id}`, {
                method: "DELETE",
            });
            setPagos((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    const totalMonto = pagos.reduce((acc, curr) => acc + parseFloat(curr.monto || "0"), 0);

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate("/casamiento")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Nuevo Casamiento
            </button>

            <h3 className="text-xl font-semibold text-gray-700">Pagos realizados</h3>

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-rose-100 text-gray-700">
                    <tr>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">ID Casamiento</th>
                        <th className="border px-4 py-2">Monto</th>
                        <th className="border px-4 py-2">Fecha</th>
                        <th className="border px-4 py-2 w-48">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pagos.map((pago) => (
                        <tr key={pago.id}>
                            {editando === pago.id ? (
                                <>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {pago.id_casamiento}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="text"
                                            name="monto"
                                            value={formData.monto}
                                            onChange={handleChange}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {new Date(formData.date).toLocaleDateString("es-PY", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="border px-4 py-2 flex justify-center gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleSave(pago.id!)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditando(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                                        >
                                            Cancelar
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="border px-4 py-2 text-center">{pago.description}</td>
                                    <td className="border px-4 py-2 text-center">{pago.id_casamiento}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {parseFloat(pago.monto).toLocaleString("es-PY", {
                                            style: "currency",
                                            currency: "PYG",
                                        })}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {pago.date
                                            ? new Date(pago.date).toLocaleDateString("es-PY", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                              })
                                            : "Sin fecha"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center items-center gap-2 flex-wrap">
                                            <button
                                                onClick={() => handleEdit(pago)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pago.id!)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-right text-lg font-semibold text-gray-700">
                Total: {totalMonto.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}
            </div>
        </div>
    );
};

export default Ventas;