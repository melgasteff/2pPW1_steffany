// ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../libs/api"; // tu instancia de Axios configurada

const ProtectedRoute = () => {
    const [auth, setAuth] = useState<null | boolean>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get("/me", { withCredentials: true });
                setAuth(true);
            } catch (e) {
                console.error(e);
                setAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (auth === null) return <div>Cargando...</div>;

    return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
