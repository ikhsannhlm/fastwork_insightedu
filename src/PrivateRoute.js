import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return null; // atau spinner/loading indicator
    }

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
