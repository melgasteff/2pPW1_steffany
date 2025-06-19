// layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Outlet />
        </div>
    );
};

export default PrivateLayout;
