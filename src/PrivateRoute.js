import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        setIsAuthenticated(!!email);
    }, []);

    if (isAuthenticated === null) {
        return null; // atau spinner/loading indicator
    }

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
