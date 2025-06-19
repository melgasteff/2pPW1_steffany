import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import api from "../libs/api";
import { ca } from "zod/v4/locales";
import type { AxiosError } from "axios";

interface CasadosInterface {
    id?: number;
    persona1: string;
    persona2: string;
}

const Steffany = () => {
    const [casados, setCasados] = useState<CasadosInterface>({ persona1: "", persona2: "" })
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 px-4">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 sm:p-10">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Casamiento Koygua</h2>
                    {
                        !casados.persona1 && !casados.persona2 ?
                            <Formulario setCasados={setCasados} /> :
                            <Certificado casados={casados} setCasados={setCasados} />
                    }


                </div>
                {
                    !casados.persona1 && !casados.persona2 ?
                    <UltimosCasados /> :
                    ""
                }

            </div>

        </>
    )
}

const Formulario = ({ setCasados }) => {

    const [form, setForm] = useState({ persona1: "", persona2: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const doCasamiento = async () => {
        if (!form.persona1 || !form.persona2) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            await api.post("/casamientos", form, { withCredentials: true });
            setCasados({ persona1: form.persona1, persona2: form.persona2 })
        } catch (err: any) {
            console.error(err);
            if(err.response.data.message) setError(err.response.data.message);
            else setError("No se ha podido crear el casamiento");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="flex">
                <div>
                    <label htmlFor="persona1" className=" text-sm font-medium text-gray-700 mb-1">
                        Persona 1
                    </label>
                    <input
                        type="persona1"
                        id="persona1"
                        name="persona1"
                        value={form.persona1}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        disabled={loading}
                    />
                </div>
                <div className="content-center p-4 text-3xl">💞</div>
                <div>
                    <label htmlFor="persona2" className=" text-sm font-medium text-gray-700 mb-1">
                        Persona 2
                    </label>
                    <input
                        type="persona2"
                        id="persona2"
                        name="persona2"
                        value={form.persona2}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        disabled={loading}
                    />
                </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="button"
                onClick={doCasamiento}
                className={`w-full py-2 text-white text-sm font-semibold rounded-lg transition-colors ${loading ? "bg-rose-400 cursor-not-allowed" : "bg-rose-800 hover:bg-rose-900"
                    }`}
                disabled={loading}
            >
                {loading ? "Cargando..." : "Casar 💍"}
            </button>
        </form>
    );
}

const Certificado = ({ casados, setCasados }) => {

    const reiniciar = () => {
        setCasados({ persona1: "", persona2: "" })
    }

    return (
        <div>

            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full border-4 border-pink-300">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-pink-600 uppercase">Certificado</h1>
                    <h2 className="text-2xl font-semibold text-pink-500">de Matrimonio Virtual</h2>
                    <h3 className="text-lg text-gray-700">Certifico que</h3>

                    <h1 className="text-3xl font-bold text-gray-800">{casados.persona1}</h1>

                    <h3 className="text-xl text-gray-600">y</h3>

                    <h1 className="text-3xl font-bold text-gray-800">{casados.persona2}</h1>

                    <h3 className="text-md text-gray-700">
                        se unen en matrimonio en la fecha <span className="font-semibold text-pink-600">14/07/25</span>
                    </h3>

                    <div className="mt-8 text-sm text-gray-500 italic">
                        Este certificado es simbólico y no tiene validez legal.
                    </div>
                </div>
            </div>
            {/* <h1>{casados.persona1} - {casados.persona2}</h1> */}
            <button
                type="button"
                onClick={reiniciar}
                className="w-full py-2 text-white text-sm font-semibold rounded-lg transition-colors  bg-indigo-600 hover:bg-indigo-700 mt-4"
            >
                Volver
            </button>
        </div>


    )
}

const UltimosCasados = () => {
    const [casadosList, setCasadosList] = useState<CasadosInterface[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            api.get("/casamientos").then((response) => {
                console.log(response.data);
                setCasadosList(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }

        fetchProducts();
    }, []);
    return (
        <>
            <h1 className="text-2xl font-extrabold mt-4">Ultimos Casados</h1>
            {casadosList.length === 0 ? (
                <p>No hay casados</p>
            ) : (
                <div>
                    {casadosList.map((casados) => (
                        <div key={casados.id} className="text-center">
                            {casados.persona1} 💍 {casados.persona2}
                        </div>
                    ))}
                </div>
            )}
        </>

    )
}

export default Steffany;