import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Puesto {
    id: number;
    nombre: string;
    categoria: 'dulce' | 'salado' | 'bebidas';
}

export const usePuestos = () => {
    return useQuery<Puesto[]>({
        queryKey: ['puestos'],
        queryFn: async () => {
            const { data } = await axios.get('/api/puestos');
            return data;
        },
    });
};