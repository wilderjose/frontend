// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, rolesPermitidos = [] }) {
    const { user, token } = useAuth();

    // Si no hay token, redirigir al login
    // Si est aes una ruta protegida mia
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si se requieren roles específicos y el usuario no tiene uno permitido
    //hola
    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(user?.rol)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default ProtectedRoute;
