import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center text-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
