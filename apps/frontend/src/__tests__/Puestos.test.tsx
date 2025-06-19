import { render, screen } from '@testing-library/react';
import PuestosList from '../components/PuestosList';

describe('PuestosList', () => {
    it('muestra la lista de puestos', async () => {
        render(<PuestosList />);
        expect(await screen.findByText('Puesto 1')).toBeInTheDocument();
    });
});