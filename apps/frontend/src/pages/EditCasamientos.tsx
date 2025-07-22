import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../libs/api";

// Interfaces
interface CasadosInterface {
  id: number;
  persona1: string;
  persona2: string;
  fecha: string;
}

// Componente principal
const EditCasamientos = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Casamiento Koygua
        </h2>
        <UltimosCasados />
      </div>
    </div>
  );
};

// Componente de tabla y edición
const UltimosCasados = () => {
  const [casadosList, setCasadosList] = useState<CasadosInterface[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    persona1: "",
    persona2: "",
    fecha: "",
  });
  const [filtroFecha, setFiltroFecha] = useState("");
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchCasados = async () => {
      try {
        const response = await api.get("/casamientos");
        setCasadosList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCasados();
  }, []);

  // Convertir fecha de "dd/mm/yyyy" a "yyyy-mm-dd"
  const normalizarFecha = (fecha: string): string => {
    const partes = fecha.split("/");
    if (partes.length === 3) {
      const [dia, mes, anio] = partes;
      return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
    return fecha;
  };

  // Filtro y orden
  const casadosFiltrados = casadosList
    .filter((c) => {
      if (!filtroFecha) return true;
      return normalizarFecha(c.fecha) === filtroFecha;
    })
    .sort((a, b) => {
      const fechaA = normalizarFecha(a.fecha);
      const fechaB = normalizarFecha(b.fecha);
      return ordenAscendente
        ? fechaA.localeCompare(fechaB)
        : fechaB.localeCompare(fechaA);
    });

  // Acciones
  const handleEdit = (casado: CasadosInterface) => {
    setEditando(casado.id);
    setFormData({ ...casado });
  };

  const handleSave = async (id: number) => {
    try {
      await api.put(`/editcasamiento/${id}`, formData, {
        withCredentials: true,
      });
      setCasadosList((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                persona1: formData.persona1,
                persona2: formData.persona2,
                fecha: formData.fecha,
              }
            : c
        )
      );
      setEditando(null);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     await api.delete(`/deletecasamiento/${id}`);
  //     setCasadosList((prev) => prev.filter((c) => c.id !== id));
  //   } catch (error) {
  //     console.error("Error al eliminar:", error);
  //   }
  // };

  return (
    <div className="mt-6">
      {casadosList.length === 0 ? (
        <p className="text-center text-gray-600">No hay casados</p>
      ) : (
        <>
          {/* Filtro y orden */}
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Filtrar por fecha:
              </label>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="mb-4 border rounded px-2 py-1"
              />
            </div>
            <div>
              <button
                onClick={() => setOrdenAscendente(!ordenAscendente)}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
              >
                Ordenar por fecha: {ordenAscendente ? "Ascendente" : "Descendente"}
              </button>
            </div>
          </div>

          {/* Tabla de datos */}
          <table className="table-auto w-full border border-collapse border-gray-300">
            <thead className="bg-rose-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Persona 1</th>
                <th className="border px-4 py-2">Persona 2</th>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2 w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {casadosFiltrados.map((c) => (
                <tr key={c.id}>
                  {editando === c.id ? (
                    <>
                      <td className="border px-4 py-2">{c.id}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="persona1"
                          value={formData.persona1}
                          onChange={handleChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="persona2"
                          value={formData.persona2}
                          onChange={handleChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border px-4 py-2">{formData.fecha}</td>
                      <td className="border px-4 py-2 flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleSave(c.id)}
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
                      <td className="border px-4 py-2 text-center">{c.id}</td>
                      <td className="border px-4 py-2 text-center">{c.persona1}</td>
                      <td className="border px-4 py-2 text-center">{c.persona2}</td>
                      <td className="border px-4 py-2 text-center">{c.fecha}</td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleEdit(c)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                          >
                            Editar
                          </button>
                          {/* <button
                            onClick={() => handleDelete(c.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                          >
                            Eliminar
                          </button> */}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Link
        to="/casamiento"
        className="block py-2 text-start text-indigo-600 text-sm font-semibold transition-colors hover:text-indigo-700 mt-4"
      >
        Volver
      </Link>
    </div>
  );
};

export default EditCasamientos;